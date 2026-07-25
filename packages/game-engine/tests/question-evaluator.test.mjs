import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { FamousPersonSchema } from "@mindguess/entity-schema";
import { evaluateQuestion } from "../dist/index.js";

async function loadJson(relativeUrl) {
  return JSON.parse(
    await readFile(new URL(relativeUrl, import.meta.url), "utf8"),
  );
}

async function loadData() {
  const rawPeople = await loadJson("../../../data/people/people.v1.json");
  const questions = await loadJson("../../../data/questions/questions.v1.json");
  const people = rawPeople.map((person) => FamousPersonSchema.parse(person));

  return {
    person: (slug) => people.find((item) => item.slug === slug),
    question: (id) => questions.find((item) => item.id === id),
  };
}

test("Ronaldo tem o desporto como área pública principal", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(
      data.person("cristiano-ronaldo"),
      data.question("public-area-sports"),
    ),
    "true",
  );
});

test("Taylor Swift não tem o desporto como área pública principal", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(
      data.person("taylor-swift"),
      data.question("public-area-sports"),
    ),
    "false",
  );
});

test("Einstein não está vivo", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(data.person("albert-einstein"), data.question("alive-yes")),
    "false",
  );
});

test("Messi nasceu na América do Sul", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(
      data.person("lionel-messi"),
      data.question("birth-continent-south-america"),
    ),
    "true",
  );
});

test("Rowling tem a literatura como área pública principal", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(data.person("j-k-rowling"), data.question("public-area-literature")),
    "true",
  );
});

test("um valor null produz unknown", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(data.person("taylor-swift"), data.question("guinness-record")),
    "unknown",
  );
});
