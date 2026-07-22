import {
  getBirthContinent,
  type FamousPerson,
} from "@mindguess/entity-schema";

export const QUESTION_SOURCES = ["stored", "derived"] as const;
export type QuestionSource = (typeof QUESTION_SOURCES)[number];

export const QUESTION_OPERATORS = ["equals", "contains", "is_not_null"] as const;
export type QuestionOperator = (typeof QUESTION_OPERATORS)[number];

export const EVALUATION_RESULTS = ["true", "false", "unknown"] as const;
export type EvaluationResult = (typeof EVALUATION_RESULTS)[number];

export type QuestionValue = string | boolean;

export interface Question {
  readonly id: string;
  readonly source: QuestionSource;
  readonly attribute: string;
  readonly operator: QuestionOperator;
  readonly expectedValue: QuestionValue;
  readonly canonicalText: string;
}

function evaluateValue(
  actualValue: unknown,
  operator: QuestionOperator,
  expectedValue: QuestionValue,
): EvaluationResult {
  if (actualValue === null || actualValue === undefined) {
    return operator === "is_not_null" ? "false" : "unknown";
  }

  if (operator === "is_not_null") {
    return "true";
  }

  if (operator === "contains") {
    if (!Array.isArray(actualValue)) {
      return "unknown";
    }

    return actualValue.includes(expectedValue) ? "true" : "false";
  }

  return actualValue === expectedValue ? "true" : "false";
}

function getDerivedValue(person: FamousPerson, attribute: string): unknown {
  switch (attribute) {
    case "birthContinent":
      return getBirthContinent(person.attributes);
    default:
      return undefined;
  }
}

export function evaluateQuestion(
  person: FamousPerson,
  question: Question,
): EvaluationResult {
  const actualValue =
    question.source === "derived"
      ? getDerivedValue(person, question.attribute)
      : person.attributes[
          question.attribute as keyof FamousPerson["attributes"]
        ];

  return evaluateValue(
    actualValue,
    question.operator,
    question.expectedValue,
  );
}

export type PlayerAnswer = "yes" | "no" | "maybe" | "unknown";

export interface CandidateProbability {
  readonly person: FamousPerson;
  readonly probability: number;
}

const ANSWER_LIKELIHOODS: Readonly<
  Record<PlayerAnswer, Readonly<Record<EvaluationResult, number>>>
> = {
  yes: {
    true: 0.9,
    false: 0.1,
    unknown: 0.5,
  },
  no: {
    true: 0.1,
    false: 0.9,
    unknown: 0.5,
  },
  maybe: {
    true: 0.65,
    false: 0.35,
    unknown: 0.5,
  },
  unknown: {
    true: 1,
    false: 1,
    unknown: 1,
  },
};

export function createUniformDistribution(
  people: readonly FamousPerson[],
): CandidateProbability[] {
  if (people.length === 0) {
    throw new Error("Não é possível criar uma distribuição sem candidatos.");
  }

  const probability = 1 / people.length;
  return people.map((person) => ({ person, probability }));
}

export function normalizeDistribution(
  candidates: readonly CandidateProbability[],
): CandidateProbability[] {
  const total = candidates.reduce(
    (sum, candidate) => sum + candidate.probability,
    0,
  );

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error("A distribuição não pode ser normalizada.");
  }

  return candidates.map((candidate) => ({
    person: candidate.person,
    probability: candidate.probability / total,
  }));
}

export function updateDistribution(
  candidates: readonly CandidateProbability[],
  question: Question,
  answer: PlayerAnswer,
): CandidateProbability[] {
  if (answer === "unknown") {
    return candidates.map((candidate) => ({ ...candidate }));
  }

  const weighted = candidates.map((candidate) => {
    const evaluation = evaluateQuestion(candidate.person, question);
    const likelihood = ANSWER_LIKELIHOODS[answer][evaluation];

    return {
      person: candidate.person,
      probability: candidate.probability * likelihood,
    };
  });

  return normalizeDistribution(weighted);
}

export function rankCandidates(
  candidates: readonly CandidateProbability[],
): CandidateProbability[] {
  return [...candidates].sort((left, right) => {
    const probabilityDifference = right.probability - left.probability;
    if (probabilityDifference !== 0) {
      return probabilityDifference;
    }

    return left.person.slug.localeCompare(right.person.slug);
  });
}

export function getTopCandidate(
  candidates: readonly CandidateProbability[],
): CandidateProbability {
  const topCandidate = rankCandidates(candidates)[0];
  if (topCandidate === undefined) {
    throw new Error("Não existem candidatos disponíveis.");
  }

  return topCandidate;
}

export interface QuestionScore {
  readonly question: Question;
  readonly informationGain: number;
  readonly expectedEntropy: number;
}

export function calculateEntropy(
  candidates: readonly CandidateProbability[],
): number {
  return candidates.reduce((entropy, candidate) => {
    const probability = candidate.probability;
    if (probability <= 0) {
      return entropy;
    }

    return entropy - probability * Math.log2(probability);
  }, 0);
}

export function scoreQuestion(
  candidates: readonly CandidateProbability[],
  question: Question,
): QuestionScore {
  const normalized = normalizeDistribution(candidates);
  const currentEntropy = calculateEntropy(normalized);
  const groups = new Map<EvaluationResult, CandidateProbability[]>();

  for (const candidate of normalized) {
    const result = evaluateQuestion(candidate.person, question);
    const group = groups.get(result) ?? [];
    group.push(candidate);
    groups.set(result, group);
  }

  let expectedEntropy = 0;
  for (const group of groups.values()) {
    const groupProbability = group.reduce(
      (sum, candidate) => sum + candidate.probability,
      0,
    );

    if (groupProbability <= 0) {
      continue;
    }

    const conditionalDistribution = group.map((candidate) => ({
      person: candidate.person,
      probability: candidate.probability / groupProbability,
    }));

    expectedEntropy +=
      groupProbability * calculateEntropy(conditionalDistribution);
  }

  const rawInformationGain = currentEntropy - expectedEntropy;
  const informationGain = Math.abs(rawInformationGain) < 1e-12
    ? 0
    : rawInformationGain;

  return { question, informationGain, expectedEntropy };
}

export function rankQuestions(
  candidates: readonly CandidateProbability[],
  questions: readonly Question[],
  askedQuestionIds: ReadonlySet<string> = new Set(),
): QuestionScore[] {
  return questions
    .filter((question) => !askedQuestionIds.has(question.id))
    .map((question) => scoreQuestion(candidates, question))
    .filter((score) => score.informationGain > 1e-12)
    .sort((left, right) => {
      const gainDifference = right.informationGain - left.informationGain;
      if (Math.abs(gainDifference) > 1e-12) {
        return gainDifference;
      }

      return left.question.id.localeCompare(right.question.id);
    });
}

export function selectNextQuestion(
  candidates: readonly CandidateProbability[],
  questions: readonly Question[],
  askedQuestionIds: ReadonlySet<string> = new Set(),
): QuestionScore | null {
  return rankQuestions(candidates, questions, askedQuestionIds)[0] ?? null;
}
