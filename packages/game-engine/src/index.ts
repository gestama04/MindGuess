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
