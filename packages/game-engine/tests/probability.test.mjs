import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  createUniformDistribution,
  getTopCandidate,
  rankCandidates,
  updateDistribution,
} from "../dist/index.js";

const question = (id) => questions.find((item) => item.id === id);
const sumProbabilities = (candidates) =>
  candidates.reduce((sum, candidate) => sum + candidate.probability, 0);

test("distribuição inicial é uniforme e soma 1", () => {
  const distribution = createUniformDistribution(people);
  assert.equal(distribution.length, people.length);
  assert.ok(
    distribution.every(
      (candidate) =>
        Math.abs(candidate.probability - 1 / people.length) < 1e-12,
    ),
  );
  assert.ok(Math.abs(sumProbabilities(distribution) - 1) < 1e-12);
});

test("yes favorece candidatos de desporto", () => {
  const updated = updateDistribution(
    createUniformDistribution(people),
    question("public-area-sports"),
    "yes",
  );
  const sports = updated.filter(
    (candidate) => candidate.person.attributes.publicArea === "sports",
  );
  const others = updated.filter(
    (candidate) => candidate.person.attributes.publicArea !== "sports",
  );
  assert.ok(
    Math.min(...sports.map((candidate) => candidate.probability)) >
      Math.max(...others.map((candidate) => candidate.probability)),
  );
  assert.ok(Math.abs(sumProbabilities(updated) - 1) < 1e-12);
});

test("no reduz candidatos de desporto", () => {
  const updated = updateDistribution(
    createUniformDistribution(people),
    question("public-area-sports"),
    "no",
  );
  const bySlug = Object.fromEntries(
    updated.map((candidate) => [candidate.person.slug, candidate.probability]),
  );
  assert.ok(bySlug["taylor-swift"] > bySlug["cristiano-ronaldo"]);
});

test("maybe é menos forte do que yes", () => {
  const initial = createUniformDistribution(people);
  const yesTop = getTopCandidate(
    updateDistribution(initial, question("public-area-sports"), "yes"),
  );
  const maybeTop = getTopCandidate(
    updateDistribution(initial, question("public-area-sports"), "maybe"),
  );
  assert.ok(yesTop.probability > maybeTop.probability);
  assert.ok(maybeTop.probability > 1 / people.length);
});

test("unknown não altera valores", () => {
  const initial = createUniformDistribution(people);
  const updated = updateDistribution(
    initial,
    question("public-area-sports"),
    "unknown",
  );
  assert.deepEqual(updated, initial);
  assert.notEqual(updated, initial);
});

test("uma avaliação desconhecida recebe peso neutro, não peso de false", () => {
  const basePerson = people[0];
  const unknownPerson = {
    ...basePerson,
    id: "00000000-0000-4000-8000-000000000001",
    slug: "candidate-unknown",
    attributes: {
      ...basePerson.attributes,
      hasGuinnessRecognizedRecord: null,
    },
  };
  const falsePerson = {
    ...basePerson,
    id: "00000000-0000-4000-8000-000000000002",
    slug: "candidate-false",
    attributes: {
      ...basePerson.attributes,
      hasGuinnessRecognizedRecord: false,
    },
  };
  const updated = updateDistribution(
    createUniformDistribution([unknownPerson, falsePerson]),
    question("guinness-record"),
    "yes",
  );
  const bySlug = Object.fromEntries(
    updated.map((candidate) => [candidate.person.slug, candidate.probability]),
  );
  assert.ok(bySlug["candidate-unknown"] > bySlug["candidate-false"]);
});

test("ranking usa slug no empate", () => {
  const ranked = rankCandidates(createUniformDistribution(people));
  assert.deepEqual(
    ranked.map((candidate) => candidate.person.slug),
    people.map((person) => person.slug).sort(),
  );
});

test("lista vazia é rejeitada", () => {
  assert.throws(() => createUniformDistribution([]), /sem candidatos/);
});
