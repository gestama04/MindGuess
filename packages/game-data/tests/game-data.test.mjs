import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "../dist/index.js";
test("exporta 34 pessoas validadas", () => { assert.equal(people.length, 34); assert.equal(new Set(people.map(p => p.slug)).size, 34); });
test("mantém pessoas históricas do protótipo", () => { for (const slug of ["cristiano-ronaldo","taylor-swift","albert-einstein","marie-curie","j-k-rowling","stephen-king"]) assert.ok(people.some(p => p.slug === slug), slug); });
test("inclui tags controladas em todas as pessoas", () => { assert.ok(people.every(p => Array.isArray(p.attributes.tags))); });
test("exporta perguntas únicas e naturais", () => { assert.ok(questions.length >= 45); assert.equal(new Set(questions.map(q => q.id)).size, questions.length); assert.ok(questions.every(q => q.canonicalText.endsWith("?"))); });
