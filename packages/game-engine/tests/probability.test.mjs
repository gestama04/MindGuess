import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  createUniformDistribution,
  getTopCandidate,
  rankCandidates,
  updateDistribution,
} from "../dist/index.js";

async function loadData() {

  return {
    people,
    question: (id) => questions.find((question) => question.id === id),
  };
}

function sumProbabilities(candidates) {
  return candidates.reduce((sum, candidate) => sum + candidate.probability, 0);
}

test("a distribuição inicial é uniforme e soma 1", async () => {
  const { people } = await loadData();
  const distribution = createUniformDistribution(people);

  assert.equal(distribution.length, 5);
  for (const candidate of distribution) {
    assert.ok(Math.abs(candidate.probability - 0.2) < 1e-12);
  }
  assert.ok(Math.abs(sumProbabilities(distribution) - 1) < 1e-12);
});

test("uma resposta yes aumenta as pessoas cuja área principal é o desporto", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("public-area-sports"), "yes");
  const ranked = rankCandidates(updated);

  assert.deepEqual(
    ranked.slice(0, 2).map((candidate) => candidate.person.slug).sort(),
    ["cristiano-ronaldo", "lionel-messi"],
  );
  assert.ok(ranked[0].probability > 0.2);
  assert.ok(Math.abs(sumProbabilities(updated) - 1) < 1e-12);
});

test("uma resposta no reduz as pessoas cuja área principal é o desporto", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("public-area-sports"), "no");
  const bySlug = Object.fromEntries(
    updated.map((candidate) => [candidate.person.slug, candidate.probability]),
  );

  assert.ok(bySlug["taylor-swift"] > bySlug["cristiano-ronaldo"]);
  assert.ok(bySlug["j-k-rowling"] > bySlug["lionel-messi"]);
});

test("maybe atualiza com menos força do que yes", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const yes = updateDistribution(initial, data.question("public-area-sports"), "yes");
  const maybe = updateDistribution(initial, data.question("public-area-sports"), "maybe");
  const yesTop = getTopCandidate(yes);
  const maybeTop = getTopCandidate(maybe);

  assert.ok(yesTop.probability > maybeTop.probability);
  assert.ok(maybeTop.probability > 0.2);
});

test("unknown não altera a distribuição", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("public-area-sports"), "unknown");

  assert.deepEqual(updated, initial);
  assert.notEqual(updated, initial);
});

test("valores desconhecidos não são tratados como false", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("guinness-record"), "yes");
  const bySlug = Object.fromEntries(
    updated.map((candidate) => [candidate.person.slug, candidate.probability]),
  );

  assert.ok(bySlug["taylor-swift"] > bySlug["albert-einstein"]);
  assert.ok(bySlug["j-k-rowling"] > bySlug["albert-einstein"]);
});

test("o ranking usa slug como desempate determinístico", async () => {
  const { people } = await loadData();
  const ranked = rankCandidates(createUniformDistribution(people));
  const expected = people.map((person) => person.slug).sort();

  assert.deepEqual(ranked.map((candidate) => candidate.person.slug), expected);
});

test("uma lista vazia é rejeitada", () => {
  assert.throws(() => createUniformDistribution([]), /sem candidatos/);
});
