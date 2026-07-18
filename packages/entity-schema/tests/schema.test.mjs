import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  FamousPersonSchema,
  getBirthContinent,
  hasProfession,
  isAssociatedWith,
  isPolitician,
  isProfessionalAthlete,
  safeValidateFamousPerson,
  validateFamousPerson,
} from "../dist/index.js";

async function readJson(relativeUrl) {
  const filePath = fileURLToPath(new URL(relativeUrl, import.meta.url));
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function readValidPerson() {
  return readJson("../fixtures/valid-person.json");
}

test("aceita uma pessoa famosa válida", async () => {
  const result = safeValidateFamousPerson(await readValidPerson());
  assert.equal(result.success, true);
  assert.equal(result.data?.attributes.birthCountry, "portugal");
});

test("rejeita uma entidade inválida", async () => {
  const person = await readJson("../fixtures/invalid-person.json");
  const result = FamousPersonSchema.safeParse(person);
  assert.equal(result.success, false);
  assert.ok(result.error.issues.length >= 1);
});

test("rejeita atributos antigos ou desconhecidos", async () => {
  const person = await readValidPerson();
  person.attributes.isActor = false;
  assert.equal(safeValidateFamousPerson(person).success, false);
});

test("deriva o continente do país de nascimento", async () => {
  const person = validateFamousPerson(await readValidPerson());
  assert.equal(getBirthContinent(person.attributes), "europe");
});

test("deriva profissão e associação geográfica", async () => {
  const person = validateFamousPerson(await readValidPerson());
  assert.equal(hasProfession(person.attributes, "writer"), true);
  assert.equal(hasProfession(person.attributes, "actor"), false);
  assert.equal(isAssociatedWith(person.attributes, "portugal"), true);
});

test("deriva atleta profissional e político", async () => {
  const person = validateFamousPerson(await readValidPerson());
  assert.equal(isProfessionalAthlete(person.attributes), false);
  assert.equal(isPolitician(person.attributes), false);
});

test("validateFamousPerson devolve os dados validados", async () => {
  const person = validateFamousPerson(await readValidPerson());
  assert.equal(person.schemaVersion, 1);
  assert.equal(person.attributes.hasPublishedBooks, true);
});
