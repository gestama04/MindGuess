import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
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

console.log("\nResumo");
console.log("------");
console.log(`Taxa de sucesso: ${successCount}/${results.length}`);
console.log(`Média de turnos: ${averageTurns.toFixed(2)}`);
console.log(`Confiança média: ${(averageConfidence * 100).toFixed(2)}%`);
console.log(`Respostas unknown: ${totalUnknown}`);

if (successCount !== results.length) {
  process.exitCode = 1;
  throw new Error("O motor não identificou corretamente todas as pessoas do dataset.");
}
