import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  FamousPersonSchema,
  safeValidateFamousPerson,
  validateFamousPerson,
} from "../dist/index.js";

async function readJson(relativeUrl) {
  const filePath = fileURLToPath(new URL(relativeUrl, import.meta.url));
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

test("aceita uma pessoa famosa valida", async () => {
  const person = await readJson("../fixtures/valid-person.json");
  const result = safeValidateFamousPerson(person);

  assert.equal(result.success, true);
  assert.equal(result.data?.slug, "pessoa-de-teste");
});

test("rejeita uma entidade invalida", async () => {
  const person = await readJson("../fixtures/invalid-person.json");
  const result = FamousPersonSchema.safeParse(person);

  assert.equal(result.success, false);
  assert.ok(result.error.issues.length >= 1);
});

test("rejeita um objeto vazio", () => {
  assert.equal(safeValidateFamousPerson({}).success, false);
});

test("validateFamousPerson devolve os dados validados", async () => {
  const person = await readJson("../fixtures/valid-person.json");
  const validated = validateFamousPerson(person);

  assert.equal(validated.schemaVersion, 1);
  assert.equal(validated.category, "famous_person");
});
