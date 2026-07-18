import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { FamousPersonSchema } from "../dist/index.js";

async function readJson(relativeUrl) {
  const filePath = fileURLToPath(new URL(relativeUrl, import.meta.url));
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

const validPerson = await readJson("../fixtures/valid-person.json");
const invalidPerson = await readJson("../fixtures/invalid-person.json");

const validResult = FamousPersonSchema.safeParse(validPerson);
const invalidResult = FamousPersonSchema.safeParse(invalidPerson);

console.log(`Entidade valida aceite: ${validResult.success}`);
console.log(`Entidade invalida rejeitada: ${!invalidResult.success}`);

if (!validResult.success) {
  console.error(validResult.error.issues);
  process.exitCode = 1;
}

if (invalidResult.success) {
  console.error("Erro: a entidade invalida foi aceite.");
  process.exitCode = 1;
} else {
  console.log(`Problemas detetados: ${invalidResult.error.issues.length}`);
}
