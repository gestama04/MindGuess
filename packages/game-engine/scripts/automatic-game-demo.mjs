import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
  rankCandidates,
} from "../dist/index.js";

function evaluationToAnswer(evaluation) {
  if (evaluation === "true") return "yes";
  if (evaluation === "false") return "no";
  return "unknown";
}

function printTopCandidates(session, limit = 3) {
  for (const candidate of rankCandidates(session.candidates).slice(0, limit)) {
    const percentage = (candidate.probability * 100).toFixed(2);
    console.log(`  ${candidate.person.name.padEnd(20)} ${percentage.padStart(6)}%`);
  }
}

const secretPerson = people.find((person) => person.slug === "taylor-swift");

if (secretPerson === undefined) {
  throw new Error("A pessoa secreta da demonstração não foi encontrada.");
}

let session = createGameSession(people, questions, {
  guessThreshold: 0.85,
  maxTurns: 12,
});

console.log("MindGuess - partida automática");
console.log("================================");
console.log(`Pessoa secreta para demonstração: ${secretPerson.name}`);
console.log("O Game Engine não recebe diretamente esta identidade.\n");

while (session.status === "active") {
  const question = session.currentQuestion;
  const evaluation = evaluateQuestion(secretPerson, question);
  const answer = evaluationToAnswer(evaluation);

  console.log(`Turno ${session.turn + 1}`);
  console.log(`Pergunta: ${question.canonicalText}`);
  console.log(`Resposta simulada: ${answer}`);

  session = answerCurrentQuestion(session, answer);
  printTopCandidates(session);
  console.log("");
}

const recommendation = getRecommendedGuess(session);
console.log(`Estado antes da tentativa: ${session.status}`);
console.log(`Tentativa recomendada: ${recommendation.person.name}`);
console.log(`Confiança: ${(recommendation.probability * 100).toFixed(2)}%`);

session = finalizeGameSession(session);
const correct = session.finalGuess.person.slug === secretPerson.slug;

console.log(`Resultado: ${correct ? "CORRETO" : "INCORRETO"}`);
console.log(`Turnos realizados: ${session.turn}`);
console.log(`Estado final: ${session.status}`);

if (!correct) {
  throw new Error("A demonstração terminou com uma tentativa incorreta.");
}
