import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  calculateEntropy,
  createUniformDistribution,
  evaluateQuestion,
  rankQuestions,
  scoreQuestion,
  selectNextQuestion,
  updateDistribution,
} from "../dist/index.js";

async function loadData() {

  return {
    people,
    questions,
    question: (id) => questions.find((question) => question.id === id),
  };
}

test("a entropia de candidatos uniformes é log2 do total", async () => {
  const data = await loadData();
  const entropy = calculateEntropy(createUniformDistribution(data.people));
  assert.ok(Math.abs(entropy - Math.log2(data.people.length)) < 1e-12);
});

test("uma distribuição certa tem entropia zero", async () => {
  const data = await loadData();
  assert.equal(calculateEntropy([{ person: data.people[0], probability: 1 }]), 0);
});

test("uma pergunta útil tem ganho de informação positivo", async () => {
  const data = await loadData();
  const score = scoreQuestion(
    createUniformDistribution(data.people),
    data.question("public-area-sports"),
  );
  assert.ok(score.informationGain > 0);
  assert.ok(score.expectedEntropy < Math.log2(data.people.length));
});

test("a pontuação representa as atualizações reais da partida", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const question = data.question("guinness-record");
  const score = scoreQuestion(initial, question);

  const evaluationProbabilities = {
    true: 0,
    false: 0,
    unknown: 0,
  };

  for (const candidate of initial) {
    const evaluation = evaluateQuestion(candidate.person, question);
    evaluationProbabilities[evaluation] += candidate.probability;
  }

  const afterYes = updateDistribution(initial, question, "yes");
  const afterNo = updateDistribution(initial, question, "no");
  const afterUnknown = updateDistribution(initial, question, "unknown");

  const expectedEntropy =
    evaluationProbabilities.true * calculateEntropy(afterYes) +
    evaluationProbabilities.false * calculateEntropy(afterNo) +
    evaluationProbabilities.unknown * calculateEntropy(afterUnknown);

  const expectedInformationGain =
    calculateEntropy(initial) - expectedEntropy;

  assert.ok(
    Math.abs(score.expectedEntropy - expectedEntropy) < 1e-12,
  );
  assert.ok(
    Math.abs(score.informationGain - expectedInformationGain) < 1e-12,
  );
});
test("uma pergunta que produz a mesma resposta para todos é ignorada", async () => {
  const data = await loadData();
  const uselessQuestion = {
    id: "all-international",
    source: "stored",
    attribute: "primarilyKnownInternationally",
    operator: "equals",
    expectedValue: true,
    canonicalText: "É conhecida internacionalmente?",
  };
  const score = scoreQuestion(createUniformDistribution(data.people), uselessQuestion);
  assert.equal(score.informationGain, 0);
  assert.equal(rankQuestions(createUniformDistribution(data.people), [uselessQuestion]).length, 0);
});

test("perguntas já feitas não voltam a ser selecionadas", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const first = selectNextQuestion(initial, data.questions);
  assert.notEqual(first, null);
  const second = selectNextQuestion(
    initial,
    data.questions,
    new Set([first.question.id]),
  );
  assert.notEqual(second, null);
  assert.notEqual(second.question.id, first.question.id);
});

test("o ranking é ordenado por ganho de informação decrescente", async () => {
  const data = await loadData();
  const ranked = rankQuestions(createUniformDistribution(data.people), data.questions);
  assert.ok(ranked.length > 1);
  for (let index = 1; index < ranked.length; index += 1) {
    assert.ok(ranked[index - 1].informationGain + 1e-12 >= ranked[index].informationGain);
  }
});

test("empates usam o ID da pergunta de forma determinística", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const questionA = {
    ...data.question("public-area-sports"),
    id: "a-sports",
  };
  const questionB = {
    ...data.question("public-area-sports"),
    id: "b-sports",
  };
  const ranked = rankQuestions(initial, [questionB, questionA]);
  assert.deepEqual(ranked.map((score) => score.question.id), ["a-sports", "b-sports"]);
});

test("a melhor pergunta pode mudar depois de uma resposta", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const sportsQuestion = data.question("public-area-sports");
  const updated = updateDistribution(initial, sportsQuestion, "no");
  const next = selectNextQuestion(updated, data.questions, new Set([sportsQuestion.id]));
  assert.notEqual(next, null);
  assert.notEqual(next.question.id, sportsQuestion.id);
  assert.ok(next.informationGain > 0);
});

test("devolve null quando não existem perguntas úteis disponíveis", async () => {
  const data = await loadData();
  const certain = data.people.map((person, index) => ({
    person,
    probability: index === 0 ? 1 : 0,
  }));
  assert.equal(selectNextQuestion(certain, data.questions), null);
});
