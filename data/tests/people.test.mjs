import assert from "node:assert/strict";
import test from "node:test";
import { people } from "@mindguess/game-data";
test("o dataset contém pelo menos o lote inicial", () => assert.ok(people.length >= 34));
test("IDs e slugs são únicos", () => { assert.equal(new Set(people.map(p => p.id)).size, people.length); assert.equal(new Set(people.map(p => p.slug)).size, people.length); });
test("todas estão em produção", () => assert.ok(people.every(p => p.status === "production")));
test("há variedade útil", () => assert.ok(new Set(people.map(p => p.attributes.publicArea)).size >= 5));
