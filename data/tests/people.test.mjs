import assert from "node:assert/strict";
import test from "node:test";
import { people } from "@mindguess/game-data";

test("o dataset contém exatamente cinco entidades iniciais", () => {
  assert.equal(people.length, 5);
});

test("todas as entidades cumprem o FamousPersonSchema", () => {
  assert.ok(people.every((person) => person.id && person.slug && person.attributes));
});

test("IDs e slugs são únicos", () => {
  assert.equal(new Set(people.map((person) => person.id)).size, people.length);
  assert.equal(new Set(people.map((person) => person.slug)).size, people.length);
});

test("todas as entidades iniciais estão em produção", () => {
  assert.ok(people.every((person) => person.status === "production"));
});

test("cada entidade tem os 25 atributos canónicos", () => {
  for (const person of people) assert.equal(Object.keys(person.attributes).length, 25);
});

test("o conjunto inicial contém variedade útil para o motor", () => {
  assert.ok(new Set(people.map((person) => person.attributes.publicArea)).size >= 4);
  assert.ok(people.some((person) => person.attributes.alive));
  assert.ok(people.some((person) => !person.attributes.alive));
});
