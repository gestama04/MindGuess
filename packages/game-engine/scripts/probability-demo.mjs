import { people, questions } from "@mindguess/game-data";
import {
  createUniformDistribution,
  rankCandidates,
  updateDistribution,
} from "../dist/index.js";

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

const question = questions.find((item) => item.id === "public-area-sports");
if (question === undefined) throw new Error("A pergunta public-area-sports não foi encontrada.");

const initial = createUniformDistribution(people);
printDistribution("Distribuição inicial", initial);
console.log(`\nPergunta: ${question.canonicalText}`);
console.log("Resposta simulada: yes");

const updated = updateDistribution(initial, question, "yes");
printDistribution("Distribuição atualizada", updated);

const bySlug = Object.fromEntries(
  updated.map((candidate) => [
    candidate.person.slug,
    candidate.probability,
  ]),
);

const sportsSlugs = people
  .filter((person) => person.attributes.publicArea === "sports")
  .map((person) => person.slug);

const otherSlugs = people
  .filter((person) => person.attributes.publicArea !== "sports")
  .map((person) => person.slug);

const weightedTotal =
  sportsSlugs.length * 0.9 +
  otherSlugs.length * 0.1;

const expectedSportsProbability = 0.9 / weightedTotal;
const expectedOtherProbability = 0.1 / weightedTotal;

for (const slug of sportsSlugs) {
  if (Math.abs(bySlug[slug] - expectedSportsProbability) > 1e-12) {
    throw new Error(`Probabilidade inesperada para ${slug}.`);
  }
}

for (const slug of otherSlugs) {
  if (Math.abs(bySlug[slug] - expectedOtherProbability) > 1e-12) {
    throw new Error(`Probabilidade inesperada para ${slug}.`);
  }
}
console.log("\nVerificação matemática: aprovada");
console.log(`As ${sportsSlugs.length} pessoas cuja área principal é o desporto ficaram com ${(expectedSportsProbability * 100).toFixed(2)}% cada.`);
console.log(`Os restantes candidatos ficaram com ${(expectedOtherProbability * 100).toFixed(2)}% cada.`);
