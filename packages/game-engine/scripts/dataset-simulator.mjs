import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  createUniformDistribution,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
  rankQuestions,
} from "../dist/index.js";

function evaluationToAnswer(evaluation) {
  if (evaluation === "true") return "yes";
  if (evaluation === "false") return "no";
  return "unknown";
}

function simulatePerson(secretPerson, people, questions) {
  let session = createGameSession(people, questions, {
    guessThreshold: 0.85,
    maxTurns: 12,
  });
  let unknownAnswers = 0;

  while (session.status === "active") {
    const evaluation = evaluateQuestion(secretPerson, session.currentQuestion);
    const answer = evaluationToAnswer(evaluation);
    if (answer === "unknown") unknownAnswers += 1;
    session = answerCurrentQuestion(session, answer);
  }

  const recommendation = getRecommendedGuess(session);
  session = finalizeGameSession(session);

  return {
    name: secretPerson.name,
    slug: secretPerson.slug,
    guessedSlug: recommendation.person.slug,
    guessedName: recommendation.person.name,
    correct: recommendation.person.slug === secretPerson.slug,
    turns: session.turn,
    confidence: recommendation.probability,
    unknownAnswers,
    readyReason: session.readyReason,
    questionIds: session.history.map((turn) => turn.question.id),
  };
}

const results = people.map((person) => simulatePerson(person, people, questions));

console.log("MindGuess - simulador do dataset");
console.log("================================");
for (const result of results) {
  const status = result.correct ? "CORRETO" : "INCORRETO";
  const confidence = `${(result.confidence * 100).toFixed(2)}%`;
  console.log(
    `${result.name.padEnd(20)} ${status.padEnd(10)} ` +
    `${String(result.turns).padStart(2)} turnos  ` +
    `${confidence.padStart(7)}  unknown: ${result.unknownAnswers}`,
  );
  if (!result.correct) {
    console.log(`  Tentativa incorreta: ${result.guessedName}`);
  }
}

const successCount = results.filter((result) => result.correct).length;
const averageTurns = results.reduce((sum, result) => sum + result.turns, 0) / results.length;
const averageConfidence = results.reduce((sum, result) => sum + result.confidence, 0) / results.length;
const totalUnknown = results.reduce((sum, result) => sum + result.unknownAnswers, 0);

const questionUsage = new Map();
const firstQuestionUsage = new Map();
const pathUsage = new Map();
const readyReasonUsage = new Map();

for (const result of results) {
  for (const questionId of result.questionIds) {
    questionUsage.set(questionId, (questionUsage.get(questionId) ?? 0) + 1);
  }

  const firstQuestionId = result.questionIds[0];
  if (firstQuestionId !== undefined) {
    firstQuestionUsage.set(
      firstQuestionId,
      (firstQuestionUsage.get(firstQuestionId) ?? 0) + 1,
    );
  }

  const path = result.questionIds.join(" -> ");
  pathUsage.set(path, (pathUsage.get(path) ?? 0) + 1);
  readyReasonUsage.set(
    result.readyReason,
    (readyReasonUsage.get(result.readyReason) ?? 0) + 1,
  );
}

function sortUsage(usage) {
  return [...usage.entries()].sort((left, right) => {
    const countDifference = right[1] - left[1];
    return countDifference !== 0
      ? countDifference
      : String(left[0]).localeCompare(String(right[0]));
  });
}

const initialDistribution = createUniformDistribution(people);
const initialQuestionRanking = rankQuestions(
  initialDistribution,
  questions,
);
const bestInitialInformationGain =
  initialQuestionRanking[0]?.informationGain ?? 0;
const unusedQuestionIds = questions
  .map((question) => question.id)
  .filter((questionId) => !questionUsage.has(questionId))
  .sort();

console.log("\nResumo");
console.log("------");
console.log(`Taxa de sucesso: ${successCount}/${results.length}`);
console.log(`Média de turnos: ${averageTurns.toFixed(2)}`);
console.log(`Confiança média: ${(averageConfidence * 100).toFixed(2)}%`);
console.log(`Respostas unknown: ${totalUnknown}`);

console.log("\nRanking inicial por ganho de informação");
console.log("----------------------------------------");
console.log(
  `${"Pergunta".padEnd(34)} ${"Ganho".padStart(10)} ` +
  `${"Entropia".padStart(10)} ${"Relativo".padStart(10)}`,
);

for (const score of initialQuestionRanking.slice(0, 10)) {
  const relativePercentage =
    bestInitialInformationGain === 0
      ? 0
      : (score.informationGain / bestInitialInformationGain) * 100;

  console.log(
    `${score.question.id.padEnd(34)} ` +
    `${score.informationGain.toFixed(4).padStart(10)} ` +
    `${score.expectedEntropy.toFixed(4).padStart(10)} ` +
    `${`${relativePercentage.toFixed(1)}%`.padStart(10)}`,
  );
}
console.log("\nRazões de conclusão");
console.log("--------------------");
for (const [reason, count] of sortUsage(readyReasonUsage)) {
  console.log(`${String(reason).padEnd(24)} ${count}/${results.length}`);
}

console.log("\nPerguntas iniciais");
console.log("------------------");
for (const [questionId, count] of sortUsage(firstQuestionUsage)) {
  console.log(`${questionId.padEnd(34)} ${count}/${results.length}`);
}

console.log("\nFrequência das perguntas");
console.log("------------------------");
for (const [questionId, count] of sortUsage(questionUsage)) {
  const percentage = ((count / results.length) * 100).toFixed(0);
  console.log(
    `${questionId.padEnd(34)} ${String(count).padStart(2)}/${results.length}  ` +
    `${percentage.padStart(3)}%`,
  );
}

console.log("\nPerguntas nunca utilizadas");
console.log("--------------------------");
if (unusedQuestionIds.length === 0) {
  console.log("Nenhuma.");
} else {
  for (const questionId of unusedQuestionIds) console.log(`- ${questionId}`);
}

console.log("\nPercursos repetidos");
console.log("-------------------");
const repeatedPaths = sortUsage(pathUsage).filter(([, count]) => count > 1);
if (repeatedPaths.length === 0) {
  console.log("Nenhum percurso completo foi repetido.");
} else {
  for (const [path, count] of repeatedPaths) {
    console.log(`${count}x ${path}`);
  }
}

if (successCount !== results.length) {
  process.exitCode = 1;
  throw new Error("O motor não identificou corretamente todas as pessoas do dataset.");
}
