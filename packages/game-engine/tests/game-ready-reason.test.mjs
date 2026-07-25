import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { FamousPersonSchema } from "@mindguess/entity-schema";
import {
  answerCurrentQuestion,
  createGameSession,
  finalizeGameSession,
} from "../dist/index.js";

async function loadJson(relativeUrl) {
  return JSON.parse(await readFile(new URL(relativeUrl, import.meta.url), "utf8"));
}

async function loadData() {
  const people = (await loadJson("../../../data/people/people.v1.json"))
    .map((person) => FamousPersonSchema.parse(person));
  const questions = await loadJson("../../../data/questions/questions.v1.json");
  return { people, questions };
}

test("uma sessão ativa começa sem razão de conclusão", async () => {
  const data = await loadData();
  const session = createGameSession(data.people, data.questions);
  assert.equal(session.status, "active");
  assert.equal(session.readyReason, null);
});

test("atingir a confiança define confidence_threshold", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 0.3,
    maxTurns: 20,
  });
  const ready = answerCurrentQuestion(initial, "yes");
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.readyReason, "confidence_threshold");
});

test("atingir o máximo de turnos define turn_limit", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 1,
    maxTurns: 1,
  });
  const ready = answerCurrentQuestion(initial, "unknown");
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.readyReason, "turn_limit");
});

test("ficar sem perguntas úteis define no_useful_questions", async () => {
  const data = await loadData();
  const onlyQuestion = [data.questions.find((question) => question.id === "alive-yes")];
  const initial = createGameSession(data.people, onlyQuestion, {
    guessThreshold: 1,
    maxTurns: 20,
  });
  const ready = answerCurrentQuestion(initial, "unknown");
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.readyReason, "no_useful_questions");
});

test("a confiança tem prioridade sobre o limite de turnos", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 0.3,
    maxTurns: 1,
  });
  const ready = answerCurrentQuestion(initial, "yes");
  assert.equal(ready.readyReason, "confidence_threshold");
});

test("finalizar preserva a razão de conclusão", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 1,
    maxTurns: 1,
  });
  const ready = answerCurrentQuestion(initial, "unknown");
  const finished = finalizeGameSession(ready);
  assert.equal(finished.status, "finished");
  assert.equal(finished.readyReason, "turn_limit");
});
