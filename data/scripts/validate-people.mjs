import { readFile } from "node:fs/promises";
import { FamousPersonSchema } from "../../packages/entity-schema/dist/index.js";
const people=JSON.parse(await readFile(new URL("../people/people.v1.json",import.meta.url),"utf8"));
const ids=new Set(), slugs=new Set(); let failed=false;
for(const person of people){const result=FamousPersonSchema.safeParse(person);if(!result.success){failed=true;console.error(`INVÁLIDA: ${person?.name}`);console.error(result.error.issues);continue;}if(ids.has(person.id)){failed=true;console.error(`ID duplicado: ${person.id}`);}if(slugs.has(person.slug)){failed=true;console.error(`Slug duplicado: ${person.slug}`);}ids.add(person.id);slugs.add(person.slug);console.log(`OK: ${person.name}`);}
console.log(`Total: ${people.length}`);if(failed)process.exitCode=1;
