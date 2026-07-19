import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { FamousPersonSchema } from "../../packages/entity-schema/dist/index.js";

async function loadPeople() {
  const content = await readFile(
    new URL("../people/people.v1.json", import.meta.url),
    "utf8",
  );

  return JSON.parse(content);
}

test("o dataset contém exatamente cinco entidades iniciais", async () => {
  const people = await loadPeople();

  assert.equal(Array.isArray(people), true);
  assert.equal(people.length, 5);
});

test("todas as entidades cumprem o FamousPersonSchema", async () => {
  const people = await loadPeople();

  for (const person of people) {
    const result = FamousPersonSchema.safeParse(person);
    assert.equal(
      result.success,
      true,
      `${person?.name ?? "Entidade sem nome"} não cumpre o esquema`,
    );
  }
});

test("IDs e slugs são únicos", async () => {
  const people = await loadPeople();
  const ids = people.map((person) => person.id);
  const slugs = people.map((person) => person.slug);

  assert.equal(new Set(ids).size, people.length);
  assert.equal(new Set(slugs).size, people.length);
});

test("todas as entidades iniciais estão em produção", async () => {
  const people = await loadPeople();

  for (const person of people) {
    assert.equal(person.status, "production");
    assert.equal(person.schemaVersion, 1);
  }
});

test("cada entidade tem os 25 atributos canónicos", async () => {
  const people = await loadPeople();

  for (const person of people) {
    assert.equal(Object.keys(person.attributes).length, 25);
  }
});

test("o conjunto inicial contém variedade útil para o motor", async () => {
  const people = await loadPeople();
  const publicAreas = new Set(
    people.map((person) => person.attributes.publicArea),
  );
  const livingValues = new Set(
    people.map((person) => person.attributes.alive),
  );

  assert.ok(publicAreas.size >= 4);
  assert.equal(livingValues.has(true), true);
  assert.equal(livingValues.has(false), true);
});
