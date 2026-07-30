import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  finalizeGameSession,
  getRecommendedGuess,
} from "../dist/index.js";

async function loadData() {
  return { people, questions };
}

test("cria uma sessão ativa com distribuição uniforme", async () => {
  const data = await loadData();
  const session = createGameSession(data.people, data.questions);
  assert.equal(session.status, "active");
  assert.equal(session.turn, 0);
  assert.equal(session.history.length, 0);
  assert.notEqual(session.currentQuestion, null);
  assert.ok(session.candidates.every((candidate) => Math.abs(candidate.probability - 1 / data.people.length) < 1e-12));
});

test("regista uma resposta no histórico", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions);
  const questionId = initial.currentQuestion.id;
  const updated = answerCurrentQuestion(initial, "yes");
  assert.equal(updated.turn, 1);
  assert.equal(updated.history.length, 1);
  assert.equal(updated.history[0].question.id, questionId);
  assert.equal(updated.history[0].answer, "yes");
  assert.deepEqual(updated.askedQuestionIds, [questionId]);
});

test("não altera a sessão anterior", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions);
  answerCurrentQuestion(initial, "no");
  assert.equal(initial.turn, 0);
  assert.equal(initial.history.length, 0);
  assert.equal(initial.askedQuestionIds.length, 0);
});

test("não repete a pergunta anterior", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions);
  const askedId = initial.currentQuestion.id;
  const updated = answerCurrentQuestion(initial, "unknown");
  if (updated.status === "active") {
    assert.notEqual(updated.currentQuestion.id, askedId);
  }
});

test("fica pronta para adivinhar ao atingir o limite de turnos", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    maxTurns: 1,
    guessThreshold: 1,
  });
  const updated = answerCurrentQuestion(initial, "unknown");
  assert.equal(updated.status, "ready_to_guess");
  assert.equal(updated.currentQuestion, null);
});

test("fica pronta para adivinhar ao atingir a confiança configurada", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 0.11,
    maxTurns: 20,
  });
  const updated = answerCurrentQuestion(initial, "yes");
  assert.equal(updated.status, "ready_to_guess");
});

test("devolve o candidato recomendado", async () => {
  const data = await loadData();
  const session = createGameSession(data.people, data.questions);
  const guess = getRecommendedGuess(session);
  assert.ok(data.people.some((person) => person.slug === guess.person.slug));
  assert.equal(guess.probability, 1 / data.people.length);
});

test("finaliza a sessão com uma sugestão imutável", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, { maxTurns: 1 });
  const ready = answerCurrentQuestion(initial, "unknown");
  const finished = finalizeGameSession(ready);
  assert.equal(finished.status, "finished");
  assert.notEqual(finished.finalGuess, null);
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.finalGuess, null);
});

test("rejeita respostas depois de a sessão terminar", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, { maxTurns: 1 });
  const ready = answerCurrentQuestion(initial, "unknown");
  const finished = finalizeGameSession(ready);
  assert.throws(() => answerCurrentQuestion(finished, "yes"), /não aceita novas respostas/);
});

test("rejeita configurações e entradas inválidas", async () => {
  const data = await loadData();
  assert.throws(() => createGameSession([], data.questions), /sem candidatos/);
  assert.throws(() => createGameSession(data.people, []), /sem perguntas/);
  assert.throws(() => createGameSession(data.people, data.questions, { guessThreshold: 0 }), /guessThreshold/);
  assert.throws(() => createGameSession(data.people, data.questions, { maxTurns: 0 }), /maxTurns/);
});
