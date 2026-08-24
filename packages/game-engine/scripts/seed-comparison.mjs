import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
} from "../dist/index.js";

const SEEDS = [0, 1, 2];
const NEAR_BEST_RATIO = 0.95;

function evaluationToAnswer(evaluation) {
  if (evaluation === "true") return "yes";
  if (evaluation === "false") return "no";
  return "unknown";
}

function simulatePerson(secretPerson, seed) {
  let session = createGameSession(people, questions, {
    guessThreshold: 0.85,
    maxTurns: 12,
    nearBestRatio: NEAR_BEST_RATIO,
    questionSelectionSeed: seed,
  });
  const firstQuestionId = session.currentQuestion?.id ?? null;
  let unknownAnswers = 0;

  while (session.status === "active") {
    const evaluation = evaluateQuestion(
      secretPerson,
      session.currentQuestion,
    );
    const answer = evaluationToAnswer(evaluation);
    if (answer === "unknown") unknownAnswers += 1;
    session = answerCurrentQuestion(session, answer);
  }

  const recommendation = getRecommendedGuess(session);
  const readyReason = session.readyReason;
  const turns = session.turn;
  const confidence = recommendation.probability;
  const correct = recommendation.person.slug === secretPerson.slug;
  session = finalizeGameSession(session);

  return {
    correct,
    turns,
    confidence,
    unknownAnswers,
    readyReason,
    firstQuestionId,
    path: session.history.map((turn) => turn.question.id).join(" -> "),
  };
}

console.log("MindGuess - comparacao de seeds");
console.log("================================");
console.log(`nearBestRatio: ${NEAR_BEST_RATIO}`);

let allSeedsPassed = true;

for (const seed of SEEDS) {
  const results = people.map((person) => simulatePerson(person, seed));
  const successCount = results.filter((result) => result.correct).length;
  const averageTurns =
    results.reduce((sum, result) => sum + result.turns, 0) /
    results.length;
  const averageConfidence =
    results.reduce((sum, result) => sum + result.confidence, 0) /
    results.length;
  const totalUnknown = results.reduce(
    (sum, result) => sum + result.unknownAnswers,
    0,
  );
  const initialQuestions = [...new Set(
    results.map((result) => result.firstQuestionId),
  )];
  const completionReasons = [...new Set(
    results.map((result) => result.readyReason),
  )];
  const repeatedRun = people.map((person) => simulatePerson(person, seed));
  const reproducible = results.every(
    (result, index) => result.path === repeatedRun[index].path,
  );

  console.log(`\nSeed ${seed}`);
  console.log("------");
  console.log(`Pergunta inicial: ${initialQuestions.join(", ")}`);
  console.log(`Taxa de sucesso: ${successCount}/${results.length}`);
  console.log(`Media de turnos: ${averageTurns.toFixed(2)}`);
  console.log(
    `Confianca media: ${(averageConfidence * 100).toFixed(2)}%`,
  );
  console.log(`Respostas unknown: ${totalUnknown}`);
  console.log(`Razoes de conclusao: ${completionReasons.join(", ")}`);
  console.log(`Reproduzivel: ${reproducible ? "sim" : "nao"}`);

  if (
    successCount !== results.length ||
    !reproducible ||
    completionReasons.some((reason) => reason !== "confidence_threshold")
  ) {
    allSeedsPassed = false;
  }
}

if (!allSeedsPassed) {
  throw new Error("Uma ou mais seeds nao cumpriram os criterios.");
}

console.log("\nTodas as seeds cumpriram os criterios.");
