import { people } from "@mindguess/game-data";

console.log(`Dataset válido: ${people.length} pessoas.`);
for (const person of people) {
  console.log(`- ${person.name} (${person.slug})`);
}
