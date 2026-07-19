import { readFile } from "node:fs/promises";
import { FamousPersonSchema } from "@mindguess/entity-schema";
import {
  createUniformDistribution,
  rankCandidates,
  updateDistribution,
} from "../dist/index.js";

async function loadJson(relativeUrl) {
  return JSON.parse(await readFile(new URL(relativeUrl, import.meta.url), "utf8"));
}

function printDistribution(title, candidates) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
  for (const candidate of rankCandidates(candidates)) {
    const percentage = (candidate.probability * 100).toFixed(2);
    console.log(`${candidate.person.name.padEnd(20)} ${percentage.padStart(6)}%`);
  }
  const total = candidates.reduce((sum, candidate) => sum + candidate.probability, 0);
  console.log(`${"Total".padEnd(20)} ${(total * 100).toFixed(2).padStart(6)}%`);
}

const rawPeople = await loadJson("../../../data/people/people.v1.json");
const questions = await loadJson("../../../data/questions/questions.v1.json");
const people = rawPeople.map((person) => FamousPersonSchema.parse(person));
const question = questions.find((item) => item.id === "profession-footballer");
if (question === undefined) throw new Error("A pergunta profession-footballer não foi encontrada.");

const initial = createUniformDistribution(people);
printDistribution("Distribuição inicial", initial);
console.log(`\nPergunta: ${question.canonicalText}`);
console.log("Resposta simulada: yes");

const updated = updateDistribution(initial, question, "yes");
printDistribution("Distribuição atualizada", updated);

const bySlug = Object.fromEntries(updated.map((candidate) => [candidate.person.slug, candidate.probability]));
const expectedFootballer = 3 / 7;
const expectedOther = 1 / 21;
for (const slug of ["cristiano-ronaldo", "lionel-messi"]) {
  if (Math.abs(bySlug[slug] - expectedFootballer) > 1e-12) {
    throw new Error(`Probabilidade inesperada para ${slug}.`);
  }
}
for (const slug of ["taylor-swift", "albert-einstein", "j-k-rowling"]) {
  if (Math.abs(bySlug[slug] - expectedOther) > 1e-12) {
    throw new Error(`Probabilidade inesperada para ${slug}.`);
  }
}
console.log("\nVerificação matemática: aprovada");
console.log("Os dois futebolistas ficaram com 42.86% cada.");
console.log("Os restantes candidatos ficaram com 4.76% cada.");
