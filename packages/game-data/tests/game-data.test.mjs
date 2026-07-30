import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "../dist/index.js";

const NEW_SLUGS = [
  "kylian-mbappe",
  "adele",
  "marie-curie",
  "leonardo-dicaprio",
  "stephen-king",
];

test("exporta as dez pessoas validadas", () => {
  assert.equal(people.length, 10);
  assert.equal(new Set(people.map((person) => person.slug)).size, 10);
});

test("inclui o novo lote de cinco pessoas", () => {
  for (const slug of NEW_SLUGS) {
    assert.ok(people.some((person) => person.slug === slug), slug);
  }
});

test("cada pessoa mantém os 25 atributos canónicos", () => {
  for (const person of people) {
    assert.equal(Object.keys(person.attributes).length, 25, person.slug);
  }
});

test("exporta o catálogo expandido de perguntas", () => {
  assert.equal(questions.length, 33);
  assert.equal(new Set(questions.map((question) => question.id)).size, 33);
});

test("exporta todos os grupos exclusivos", () => {
  const groups = new Set(
    questions.map((question) => question.exclusiveGroup).filter(Boolean),
  );
  assert.deepEqual([...groups].sort(), [
    "becameFamousPeriod",
    "birthContinent",
    "birthCountry",
    "primaryProfession",
    "primaryPublicArea",
  ]);
});
