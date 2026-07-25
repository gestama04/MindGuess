import assert from "node:assert/strict";
import test from "node:test";
import { isQuestionAvailable } from "../dist/index.js";

const europeQuestion = {
  id: "birth-continent-europe",
  source: "derived",
  attribute: "birthContinent",
  operator: "equals",
  expectedValue: "europe",
  canonicalText: "Esta pessoa nasceu na Europa?",
  exclusiveGroup: "birthContinent",
};

const southAmericaQuestion = {
  ...europeQuestion,
  id: "birth-continent-south-america",
  expectedValue: "south_america",
  canonicalText: "Esta pessoa nasceu na América do Sul?",
};

const aliveQuestion = {
  id: "alive-yes",
  source: "stored",
  attribute: "alive",
  operator: "equals",
  expectedValue: true,
  canonicalText: "Esta pessoa está viva?",
};

test("yes resolve o grupo e bloqueia perguntas irmãs", () => {
  const resolvedGroups = new Set([europeQuestion.exclusiveGroup]);
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), resolvedGroups),
    false,
  );
});

test("no mantém perguntas irmãs disponíveis", () => {
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), new Set()),
    true,
  );
});

test("maybe mantém perguntas irmãs disponíveis", () => {
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), new Set()),
    true,
  );
});

test("unknown mantém perguntas irmãs disponíveis", () => {
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), new Set()),
    true,
  );
});

test("resolver um grupo não bloqueia perguntas de outro atributo", () => {
  assert.equal(
    isQuestionAvailable(aliveQuestion, new Set([europeQuestion.id]), new Set(["birthContinent"])),
    true,
  );
});
