import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "../dist/index.js";

test("exporta as cinco pessoas validadas", () => {
  assert.equal(people.length, 5);
  assert.equal(new Set(people.map((person) => person.slug)).size, 5);
});

test("exporta o catálogo de perguntas", () => {
  assert.equal(questions.length, 9);
  assert.equal(new Set(questions.map((question) => question.id)).size, 9);
});

test("exporta os grupos exclusivos", () => {
  const groups = new Set(
    questions.map((question) => question.exclusiveGroup).filter(Boolean),
  );
  assert.deepEqual([...groups].sort(), ["birthContinent", "primaryPublicArea"]);
});
