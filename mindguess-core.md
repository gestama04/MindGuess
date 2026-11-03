This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/dist/**, **/node_modules/**, **/*.lock
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
[packages]/
  entity-schema/
    fixtures/
      invalid-person.json
      valid-person.json
    scripts/
      validate-fixtures.mjs
    src/
      index.ts
    tests/
      schema.test.mjs
    package.json
    README.md
    tsconfig.json
  game-data/
    src/
      index.ts
    tests/
      game-data.test.mjs
    package.json
    tsconfig.json
  game-engine/
    scripts/
      automatic-game-demo.mjs
      dataset-simulator.mjs
      probability-demo.mjs
      seed-comparison.mjs
    src/
      index.ts
    tests/
      exclusive-question-groups.test.mjs
      game-ready-reason.test.mjs
      game-session.test.mjs
      primary-public-area.test.mjs
      probability.test.mjs
      question-evaluator.test.mjs
      question-selection.test.mjs
    package.json
    README.md
    tsconfig.json
  personality/
    README.md
  shared-types/
    src/
      index.ts
    package.json
    README.md
    tsconfig.json
  simulator/
    README.md

[data]/
  people/
    SOURCES.md
  scripts/
    validate-people.mjs
  tests/
    people.test.mjs
  README.md
```

# Files

## File: packages/entity-schema/scripts/validate-fixtures.mjs
```javascript
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
```

## File: packages/entity-schema/README.md
```markdown
# Entity Schema

Tipos, valores permitidos, versões e validação das entidades do MindGuess.
```

## File: packages/entity-schema/tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "composite": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```

## File: packages/game-data/package.json
```json
{
  "name": "@mindguess/game-data",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "npm run build && node --test tests/*.test.mjs"
  },
  "dependencies": {
    "@mindguess/entity-schema": "0.1.0"
  }
}
```

## File: packages/game-data/tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "composite": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

## File: packages/game-engine/scripts/seed-comparison.mjs
```javascript
import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
} from "../dist/index.js";

const SEEDS = [0, 1, 2];
const NEAR_BEST_RATIO = 0.95;

function evaluationToAnswer(evaluation) {
  if (evaluation === "true") return "yes";
  if (evaluation === "false") return "no";
  return "unknown";
}

function simulatePerson(secretPerson, seed) {
  let session = createGameSession(people, questions, {
    guessThreshold: 0.85,
    maxTurns: 12,
    nearBestRatio: NEAR_BEST_RATIO,
    questionSelectionSeed: seed,
  });
  const firstQuestionId = session.currentQuestion?.id ?? null;
  let unknownAnswers = 0;

  while (session.status === "active") {
    const evaluation = evaluateQuestion(
      secretPerson,
      session.currentQuestion,
    );
    const answer = evaluationToAnswer(evaluation);
    if (answer === "unknown") unknownAnswers += 1;
    session = answerCurrentQuestion(session, answer);
  }

  const recommendation = getRecommendedGuess(session);
  const readyReason = session.readyReason;
  const turns = session.turn;
  const confidence = recommendation.probability;
  const correct = recommendation.person.slug === secretPerson.slug;
  session = finalizeGameSession(session);

  return {
    correct,
    turns,
    confidence,
    unknownAnswers,
    readyReason,
    firstQuestionId,
    path: session.history.map((turn) => turn.question.id).join(" -> "),
  };
}

console.log("MindGuess - comparacao de seeds");
console.log("================================");
console.log(`nearBestRatio: ${NEAR_BEST_RATIO}`);

let allSeedsPassed = true;

for (const seed of SEEDS) {
  const results = people.map((person) => simulatePerson(person, seed));
  const successCount = results.filter((result) => result.correct).length;
  const averageTurns =
    results.reduce((sum, result) => sum + result.turns, 0) /
    results.length;
  const averageConfidence =
    results.reduce((sum, result) => sum + result.confidence, 0) /
    results.length;
  const totalUnknown = results.reduce(
    (sum, result) => sum + result.unknownAnswers,
    0,
  );
  const initialQuestions = [...new Set(
    results.map((result) => result.firstQuestionId),
  )];
  const completionReasons = [...new Set(
    results.map((result) => result.readyReason),
  )];
  const repeatedRun = people.map((person) => simulatePerson(person, seed));
  const reproducible = results.every(
    (result, index) => result.path === repeatedRun[index].path,
  );

  console.log(`\nSeed ${seed}`);
  console.log("------");
  console.log(`Pergunta inicial: ${initialQuestions.join(", ")}`);
  console.log(`Taxa de sucesso: ${successCount}/${results.length}`);
  console.log(`Media de turnos: ${averageTurns.toFixed(2)}`);
  console.log(
    `Confianca media: ${(averageConfidence * 100).toFixed(2)}%`,
  );
  console.log(`Respostas unknown: ${totalUnknown}`);
  console.log(`Razoes de conclusao: ${completionReasons.join(", ")}`);
  console.log(`Reproduzivel: ${reproducible ? "sim" : "nao"}`);

  if (
    successCount !== results.length ||
    !reproducible ||
    completionReasons.some((reason) => reason !== "confidence_threshold")
  ) {
    allSeedsPassed = false;
  }
}

if (!allSeedsPassed) {
  throw new Error("Uma ou mais seeds nao cumpriram os criterios.");
}

console.log("\nTodas as seeds cumpriram os criterios.");
```

## File: packages/game-engine/tests/exclusive-question-groups.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { isQuestionAvailable } from "../dist/index.js";

const europeQuestion = {
  id: "birth-continent-europe",
  source: "derived",
  attribute: "birthContinent",
  operator: "equals",
  expectedValue: "europe",
  canonicalText: "Esta pessoa nasceu na Europa?",
  exclusiveGroup: "birthContinent",
};

const southAmericaQuestion = {
  ...europeQuestion,
  id: "birth-continent-south-america",
  expectedValue: "south_america",
  canonicalText: "Esta pessoa nasceu na América do Sul?",
};

const aliveQuestion = {
  id: "alive-yes",
  source: "stored",
  attribute: "alive",
  operator: "equals",
  expectedValue: true,
  canonicalText: "Esta pessoa está viva?",
};

test("yes resolve o grupo e bloqueia perguntas irmãs", () => {
  const resolvedGroups = new Set([europeQuestion.exclusiveGroup]);
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), resolvedGroups),
    false,
  );
});

test("no mantém perguntas irmãs disponíveis", () => {
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), new Set()),
    true,
  );
});

test("maybe mantém perguntas irmãs disponíveis", () => {
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), new Set()),
    true,
  );
});

test("unknown mantém perguntas irmãs disponíveis", () => {
  assert.equal(
    isQuestionAvailable(southAmericaQuestion, new Set([europeQuestion.id]), new Set()),
    true,
  );
});

test("resolver um grupo não bloqueia perguntas de outro atributo", () => {
  assert.equal(
    isQuestionAvailable(aliveQuestion, new Set([europeQuestion.id]), new Set(["birthContinent"])),
    true,
  );
});
```

## File: packages/game-engine/README.md
```markdown
# Game Engine

Motor determinístico responsável por probabilidades, seleção de perguntas, confiança e palpites.
```

## File: packages/game-engine/tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "composite": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```

## File: packages/personality/README.md
```markdown
# Personality

Formatação de texto, templates locais e integração futura com o LLM.
```

## File: packages/shared-types/src/index.ts
```typescript
export const ANSWER_TYPES = [
  "yes",
  "no",
  "maybe",
  "unknown",
] as const;

export type AnswerType = (typeof ANSWER_TYPES)[number];

export const ENTITY_STATUSES = [
  "pending",
  "production",
  "rejected",
] as const;

export type EntityStatus = (typeof ENTITY_STATUSES)[number];

export const ENTITY_CATEGORIES = [
  "famous_person",
] as const;

export type EntityCategory = (typeof ENTITY_CATEGORIES)[number];
```

## File: packages/shared-types/package.json
```json
{
  "name": "@mindguess/shared-types",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

## File: packages/shared-types/README.md
```markdown
# Shared Types

Tipos partilhados entre os packages do MindGuess.
```

## File: packages/shared-types/tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "composite": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```

## File: packages/simulator/README.md
```markdown
# Simulator

Ferramentas para executar partidas automáticas e medir o desempenho do Game Engine.
```

## File: data/README.md
```markdown
# Game Data

Dados versionados de entidades e perguntas utilizados durante o desenvolvimento.
```

## File: packages/entity-schema/fixtures/invalid-person.json
```json
{
  "id": "invalid-uuid",
  "name": "",
  "slug": "Slug Inválido",
  "category": "animal",
  "status": "approved",
  "schemaVersion": 99,
  "aliases": [],
  "attributes": {
    "alive": "yes",
    "gender": "unknown",
    "birthCountry": "atlantis",
    "nationalities": [],
    "primaryLanguage": "klingon",
    "publicArea": "unknown_area",
    "primaryProfession": "astronaut",
    "professions": [],
    "becameFamousPeriod": "future",
    "primarilyKnownInternationally": "maybe",
    "associatedCountries": [
      "moon"
    ]
  },
  "createdAt": "yesterday",
  "updatedAt": "tomorrow"
}
```

## File: packages/entity-schema/fixtures/valid-person.json
```json
{
  "id": "7d19ca24-6f83-4bda-bf8b-4ba44f854768",
  "name": "Pessoa de Teste",
  "slug": "pessoa-de-teste",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [
    "Exemplo de Pessoa"
  ],
  "attributes": {
    "alive": true,
    "gender": "other",
    "birthCountry": "portugal",
    "nationalities": [
      "portugal"
    ],
    "primaryLanguage": "portuguese",
    "publicArea": "literature",
    "primaryProfession": "writer",
    "professions": [
      "writer"
    ],
    "becameFamousPeriod": "2020_present",
    "primarilyKnownInternationally": false,
    "associatedCountries": [
      "portugal"
    ],
    "hasActedInFilmOrTelevision": false,
    "hasReleasedMusic": false,
    "hasPresentedTelevision": false,
    "createsOnlineContent": false,
    "hasPublishedBooks": true,
    "sport": null,
    "representedNationalTeam": false,
    "heldPoliticalOffice": false,
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": false,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": false
  },
  "createdAt": "2026-07-18T16:00:00.000Z",
  "updatedAt": "2026-07-18T16:00:00.000Z"
}
```

## File: packages/entity-schema/tests/schema.test.mjs
```javascript
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
```

## File: packages/entity-schema/package.json
```json
{
  "name": "@mindguess/entity-schema",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "npm run build && node --test tests/*.test.mjs",
    "validate:samples": "npm run build && node scripts/validate-fixtures.mjs"
  },
  "dependencies": {
    "@mindguess/shared-types": "0.1.0",
    "zod": "4.1.12"
  }
}
```

## File: packages/game-data/src/index.ts
```typescript
import { FamousPersonSchema } from "@mindguess/entity-schema";

const RAW_PEOPLE = [
  {
    "id": "5d7cabd2-e37c-4f8b-8c3a-c6e20aeb8d46",
    "name": "Cristiano Ronaldo",
    "slug": "cristiano-ronaldo",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Cristiano Ronaldo dos Santos Aveiro",
      "CR7"
    ],
    "attributes": {
      "alive": true,
      "gender": "male",
      "birthCountry": "portugal",
      "nationalities": [
        "portugal"
      ],
      "primaryLanguage": "portuguese",
      "publicArea": "sports",
      "primaryProfession": "footballer",
      "professions": [
        "footballer",
        "athlete"
      ],
      "becameFamousPeriod": "2000_2009",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "portugal",
        "united_kingdom",
        "spain",
        "italy"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": false,
      "sport": "football",
      "representedNationalTeam": true,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": true
    },
    "createdAt": "2026-07-19T09:30:00.000Z",
    "updatedAt": "2026-07-19T09:30:00.000Z"
  },
  {
    "id": "1a5d8240-a39d-474a-a786-cb581d5ff873",
    "name": "Lionel Messi",
    "slug": "lionel-messi",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Lionel Andrés Messi",
      "Leo Messi"
    ],
    "attributes": {
      "alive": true,
      "gender": "male",
      "birthCountry": "argentina",
      "nationalities": [
        "argentina"
      ],
      "primaryLanguage": "spanish",
      "publicArea": "sports",
      "primaryProfession": "footballer",
      "professions": [
        "footballer",
        "athlete"
      ],
      "becameFamousPeriod": "2000_2009",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "argentina",
        "spain",
        "france",
        "united_states"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": false,
      "sport": "football",
      "representedNationalTeam": true,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": true,
      "wonWorldChampionship": true,
      "hasGuinnessRecognizedRecord": true
    },
    "createdAt": "2026-07-19T09:30:00.000Z",
    "updatedAt": "2026-07-19T09:30:00.000Z"
  },
  {
    "id": "941b63da-f390-46ef-9594-737609fe9337",
    "name": "Taylor Swift",
    "slug": "taylor-swift",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Taylor Alison Swift"
    ],
    "attributes": {
      "alive": true,
      "gender": "female",
      "birthCountry": "united_states",
      "nationalities": [
        "united_states"
      ],
      "primaryLanguage": "english",
      "publicArea": "music",
      "primaryProfession": "singer",
      "professions": [
        "singer",
        "musician"
      ],
      "becameFamousPeriod": "2000_2009",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "united_states"
      ],
      "hasActedInFilmOrTelevision": true,
      "hasReleasedMusic": true,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": false,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": null,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": null
    },
    "createdAt": "2026-07-19T09:30:00.000Z",
    "updatedAt": "2026-07-19T09:30:00.000Z"
  },
  {
    "id": "a8fdc29c-2147-4be3-b76f-f515f5ad9bd9",
    "name": "Albert Einstein",
    "slug": "albert-einstein",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Einstein"
    ],
    "attributes": {
      "alive": false,
      "gender": "male",
      "birthCountry": "germany",
      "nationalities": [
        "germany",
        "switzerland",
        "united_states"
      ],
      "primaryLanguage": "german",
      "publicArea": "science",
      "primaryProfession": "scientist",
      "professions": [
        "scientist",
        "writer"
      ],
      "becameFamousPeriod": "1900_1949",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "germany",
        "switzerland",
        "united_states"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": true,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": true,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": false
    },
    "createdAt": "2026-07-19T09:30:00.000Z",
    "updatedAt": "2026-07-19T09:30:00.000Z"
  },
  {
    "id": "a52847d0-ff86-46b3-98dd-66bccc17cb28",
    "name": "J. K. Rowling",
    "slug": "j-k-rowling",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Joanne Rowling",
      "Robert Galbraith",
      "J.K. Rowling"
    ],
    "attributes": {
      "alive": true,
      "gender": "female",
      "birthCountry": "united_kingdom",
      "nationalities": [
        "united_kingdom"
      ],
      "primaryLanguage": "english",
      "publicArea": "literature",
      "primaryProfession": "writer",
      "professions": [
        "writer"
      ],
      "becameFamousPeriod": "1980_1999",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "united_kingdom"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": true,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": null
    },
    "createdAt": "2026-07-19T09:30:00.000Z",
    "updatedAt": "2026-07-19T09:30:00.000Z"
  },
  {
    "id": "e4b96115-c498-5ad9-94c6-850d70f0d09b",
    "name": "Kylian Mbappé",
    "slug": "kylian-mbappe",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Kylian Mbappe",
      "Kylian Mbappé Lottin"
    ],
    "attributes": {
      "alive": true,
      "gender": "male",
      "birthCountry": "france",
      "nationalities": [
        "france"
      ],
      "primaryLanguage": "french",
      "publicArea": "sports",
      "primaryProfession": "footballer",
      "professions": [
        "footballer",
        "athlete"
      ],
      "becameFamousPeriod": "2010_2019",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "france",
        "spain"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": false,
      "sport": "football",
      "representedNationalTeam": true,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": false,
      "wonOlympicMedal": false,
      "wonWorldChampionship": true,
      "hasGuinnessRecognizedRecord": true
    },
    "createdAt": "2026-07-30T10:00:00.000Z",
    "updatedAt": "2026-07-30T10:00:00.000Z"
  },
  {
    "id": "fd6eaec0-c454-5d5b-bfbe-b90133b8b727",
    "name": "Adele",
    "slug": "adele",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Adele Laurie Blue Adkins"
    ],
    "attributes": {
      "alive": true,
      "gender": "female",
      "birthCountry": "united_kingdom",
      "nationalities": [
        "united_kingdom"
      ],
      "primaryLanguage": "english",
      "publicArea": "music",
      "primaryProfession": "singer",
      "professions": [
        "singer",
        "musician"
      ],
      "becameFamousPeriod": "2000_2009",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "united_kingdom",
        "united_states"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": true,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": false,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": true
    },
    "createdAt": "2026-07-30T10:00:00.000Z",
    "updatedAt": "2026-07-30T10:00:00.000Z"
  },
  {
    "id": "e6671ee0-74cb-59be-b92d-225b76915812",
    "name": "Marie Curie",
    "slug": "marie-curie",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Maria Skłodowska-Curie",
      "Maria Sklodowska-Curie"
    ],
    "attributes": {
      "alive": false,
      "gender": "female",
      "birthCountry": "other",
      "nationalities": [
        "other",
        "france"
      ],
      "primaryLanguage": "french",
      "publicArea": "science",
      "primaryProfession": "scientist",
      "professions": [
        "scientist"
      ],
      "becameFamousPeriod": "before_1900",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "other",
        "france"
      ],
      "hasActedInFilmOrTelevision": false,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": true,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": true,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": false
    },
    "createdAt": "2026-07-30T10:00:00.000Z",
    "updatedAt": "2026-07-30T10:00:00.000Z"
  },
  {
    "id": "943135cb-f59a-5711-913a-de7154bcbdc4",
    "name": "Leonardo DiCaprio",
    "slug": "leonardo-dicaprio",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Leonardo Wilhelm DiCaprio"
    ],
    "attributes": {
      "alive": true,
      "gender": "male",
      "birthCountry": "united_states",
      "nationalities": [
        "united_states"
      ],
      "primaryLanguage": "english",
      "publicArea": "acting",
      "primaryProfession": "actor",
      "professions": [
        "actor"
      ],
      "becameFamousPeriod": "1980_1999",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "united_states"
      ],
      "hasActedInFilmOrTelevision": true,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": false,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": false
    },
    "createdAt": "2026-07-30T10:00:00.000Z",
    "updatedAt": "2026-07-30T10:00:00.000Z"
  },
  {
    "id": "7ef5d8e4-8864-580f-abdd-64c3fed4a096",
    "name": "Stephen King",
    "slug": "stephen-king",
    "category": "famous_person",
    "status": "production",
    "schemaVersion": 1,
    "aliases": [
      "Stephen Edwin King",
      "Richard Bachman"
    ],
    "attributes": {
      "alive": true,
      "gender": "male",
      "birthCountry": "united_states",
      "nationalities": [
        "united_states"
      ],
      "primaryLanguage": "english",
      "publicArea": "literature",
      "primaryProfession": "writer",
      "professions": [
        "writer"
      ],
      "becameFamousPeriod": "1950_1979",
      "primarilyKnownInternationally": true,
      "associatedCountries": [
        "united_states"
      ],
      "hasActedInFilmOrTelevision": true,
      "hasReleasedMusic": false,
      "hasPresentedTelevision": false,
      "createsOnlineContent": false,
      "hasPublishedBooks": true,
      "sport": null,
      "representedNationalTeam": false,
      "heldPoliticalOffice": false,
      "foundedOrLedMajorCompany": false,
      "workedInScienceOrAcademia": false,
      "wonMajorInternationalAward": true,
      "wonOlympicMedal": false,
      "wonWorldChampionship": false,
      "hasGuinnessRecognizedRecord": false
    },
    "createdAt": "2026-07-30T10:00:00.000Z",
    "updatedAt": "2026-07-30T10:00:00.000Z"
  }
] as const;

export const questions = [
  {
    "id": "alive-yes",
    "source": "stored",
    "attribute": "alive",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa está viva?"
  },
  {
    "id": "birth-continent-europe",
    "source": "derived",
    "attribute": "birthContinent",
    "operator": "equals",
    "expectedValue": "europe",
    "canonicalText": "Esta pessoa nasceu na Europa?",
    "exclusiveGroup": "birthContinent"
  },
  {
    "id": "birth-continent-south-america",
    "source": "derived",
    "attribute": "birthContinent",
    "operator": "equals",
    "expectedValue": "south_america",
    "canonicalText": "Esta pessoa nasceu na América do Sul?",
    "exclusiveGroup": "birthContinent"
  },
  {
    "id": "public-area-sports",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "sports",
    "canonicalText": "A fama desta pessoa vem principalmente do desporto?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-literature",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "literature",
    "canonicalText": "A fama desta pessoa vem principalmente da literatura?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-music",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "music",
    "canonicalText": "A fama desta pessoa vem principalmente da música?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "associated-with-portugal",
    "source": "stored",
    "attribute": "associatedCountries",
    "operator": "contains",
    "expectedValue": "portugal",
    "canonicalText": "Esta pessoa tem uma associação pública forte a Portugal?"
  },
  {
    "id": "won-olympic-medal",
    "source": "stored",
    "attribute": "wonOlympicMedal",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa ganhou uma medalha olímpica?"
  },
  {
    "id": "guinness-record",
    "source": "stored",
    "attribute": "hasGuinnessRecognizedRecord",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa tem um recorde reconhecido pelo Guinness World Records?"
  },
  {
    "id": "birth-country-france",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "france",
    "canonicalText": "Esta pessoa nasceu em França?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-united-kingdom",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "united_kingdom",
    "canonicalText": "Esta pessoa nasceu no Reino Unido?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-united-states",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "united_states",
    "canonicalText": "Esta pessoa nasceu nos Estados Unidos?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-germany",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "germany",
    "canonicalText": "Esta pessoa nasceu na Alemanha?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-portugal",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "portugal",
    "canonicalText": "Esta pessoa nasceu em Portugal?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-argentina",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "argentina",
    "canonicalText": "Esta pessoa nasceu na Argentina?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-other",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "other",
    "canonicalText": "Esta pessoa nasceu noutro país não listado?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "public-area-acting",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "acting",
    "canonicalText": "A fama desta pessoa vem principalmente da representação?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-science",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "science",
    "canonicalText": "A fama desta pessoa vem principalmente da ciência?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "profession-footballer",
    "source": "stored",
    "attribute": "primaryProfession",
    "operator": "equals",
    "expectedValue": "footballer",
    "canonicalText": "A profissão principal desta pessoa é futebolista?",
    "exclusiveGroup": "primaryProfession"
  },
  {
    "id": "profession-singer",
    "source": "stored",
    "attribute": "primaryProfession",
    "operator": "equals",
    "expectedValue": "singer",
    "canonicalText": "A profissão principal desta pessoa é cantora ou cantor?",
    "exclusiveGroup": "primaryProfession"
  },
  {
    "id": "profession-scientist",
    "source": "stored",
    "attribute": "primaryProfession",
    "operator": "equals",
    "expectedValue": "scientist",
    "canonicalText": "A profissão principal desta pessoa é cientista?",
    "exclusiveGroup": "primaryProfession"
  },
  {
    "id": "profession-actor",
    "source": "stored",
    "attribute": "primaryProfession",
    "operator": "equals",
    "expectedValue": "actor",
    "canonicalText": "A profissão principal desta pessoa é ator ou atriz?",
    "exclusiveGroup": "primaryProfession"
  },
  {
    "id": "profession-writer",
    "source": "stored",
    "attribute": "primaryProfession",
    "operator": "equals",
    "expectedValue": "writer",
    "canonicalText": "A profissão principal desta pessoa é escritor ou escritora?",
    "exclusiveGroup": "primaryProfession"
  },
  {
    "id": "famous-before-1900",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "before_1900",
    "canonicalText": "Esta pessoa tornou-se famosa antes de 1900?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-1950-1979",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "1950_1979",
    "canonicalText": "Esta pessoa tornou-se famosa entre 1950 e 1979?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-1980-1999",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "1980_1999",
    "canonicalText": "Esta pessoa tornou-se famosa entre 1980 e 1999?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-2000-2009",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "2000_2009",
    "canonicalText": "Esta pessoa tornou-se famosa entre 2000 e 2009?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-2010-2019",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "2010_2019",
    "canonicalText": "Esta pessoa tornou-se famosa entre 2010 e 2019?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "acted-film-tv",
    "source": "stored",
    "attribute": "hasActedInFilmOrTelevision",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa trabalhou como intérprete em cinema ou televisão?"
  },
  {
    "id": "published-books",
    "source": "stored",
    "attribute": "hasPublishedBooks",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa publicou livros?"
  },
  {
    "id": "represented-national-team",
    "source": "stored",
    "attribute": "representedNationalTeam",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa representou uma seleção nacional no desporto?"
  },
  {
    "id": "science-academia",
    "source": "stored",
    "attribute": "workedInScienceOrAcademia",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa trabalhou em ciência ou academia?"
  },
  {
    "id": "major-international-award",
    "source": "stored",
    "attribute": "wonMajorInternationalAward",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa ganhou um grande prémio internacional?"
  }
] as const;

export const people = RAW_PEOPLE.map((person) =>
  FamousPersonSchema.parse(person),
);

export type GamePerson = (typeof people)[number];
export type GameQuestion = (typeof questions)[number];
```

## File: packages/game-data/tests/game-data.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "../dist/index.js";

const NEW_SLUGS = [
  "kylian-mbappe",
  "adele",
  "marie-curie",
  "leonardo-dicaprio",
  "stephen-king",
];

test("exporta as dez pessoas validadas", () => {
  assert.equal(people.length, 10);
  assert.equal(new Set(people.map((person) => person.slug)).size, 10);
});

test("inclui o novo lote de cinco pessoas", () => {
  for (const slug of NEW_SLUGS) {
    assert.ok(people.some((person) => person.slug === slug), slug);
  }
});

test("cada pessoa mantém os 25 atributos canónicos", () => {
  for (const person of people) {
    assert.equal(Object.keys(person.attributes).length, 25, person.slug);
  }
});

test("exporta o catálogo expandido de perguntas", () => {
  assert.equal(questions.length, 33);
  assert.equal(new Set(questions.map((question) => question.id)).size, 33);
});

test("exporta todos os grupos exclusivos", () => {
  const groups = new Set(
    questions.map((question) => question.exclusiveGroup).filter(Boolean),
  );
  assert.deepEqual([...groups].sort(), [
    "becameFamousPeriod",
    "birthContinent",
    "birthCountry",
    "primaryProfession",
    "primaryPublicArea",
  ]);
});
```

## File: packages/game-engine/scripts/automatic-game-demo.mjs
```javascript
import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
  rankCandidates,
} from "../dist/index.js";

function evaluationToAnswer(evaluation) {
  if (evaluation === "true") return "yes";
  if (evaluation === "false") return "no";
  return "unknown";
}

function printTopCandidates(session, limit = 3) {
  for (const candidate of rankCandidates(session.candidates).slice(0, limit)) {
    const percentage = (candidate.probability * 100).toFixed(2);
    console.log(`  ${candidate.person.name.padEnd(20)} ${percentage.padStart(6)}%`);
  }
}

const secretPerson = people.find((person) => person.slug === "taylor-swift");

if (secretPerson === undefined) {
  throw new Error("A pessoa secreta da demonstração não foi encontrada.");
}

let session = createGameSession(people, questions, {
  guessThreshold: 0.85,
  maxTurns: 12,
});

console.log("MindGuess - partida automática");
console.log("================================");
console.log(`Pessoa secreta para demonstração: ${secretPerson.name}`);
console.log("O Game Engine não recebe diretamente esta identidade.\n");

while (session.status === "active") {
  const question = session.currentQuestion;
  const evaluation = evaluateQuestion(secretPerson, question);
  const answer = evaluationToAnswer(evaluation);

  console.log(`Turno ${session.turn + 1}`);
  console.log(`Pergunta: ${question.canonicalText}`);
  console.log(`Resposta simulada: ${answer}`);

  session = answerCurrentQuestion(session, answer);
  printTopCandidates(session);
  console.log("");
}

const recommendation = getRecommendedGuess(session);
console.log(`Estado antes da tentativa: ${session.status}`);
console.log(`Tentativa recomendada: ${recommendation.person.name}`);
console.log(`Confiança: ${(recommendation.probability * 100).toFixed(2)}%`);

session = finalizeGameSession(session);
const correct = session.finalGuess.person.slug === secretPerson.slug;

console.log(`Resultado: ${correct ? "CORRETO" : "INCORRETO"}`);
console.log(`Turnos realizados: ${session.turn}`);
console.log(`Estado final: ${session.status}`);

if (!correct) {
  throw new Error("A demonstração terminou com uma tentativa incorreta.");
}
```

## File: data/people/SOURCES.md
```markdown
# Fontes das pessoas famosas

## Lote inicial

As fontes do lote inicial permanecem documentadas no repositório.

## Lote 2 - 30 de julho de 2026

- Kylian Mbappé: https://www.realmadrid.com/en-US/football/first-team/players/kylian-mbappe
- Kylian Mbappé (biografia): https://www.britannica.com/biography/Kylian-Mbappe
- Adele: https://www.britannica.com/biography/Adele
- Marie Curie: https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/
- Marie Curie (biografia): https://www.britannica.com/biography/Marie-Curie
- Leonardo DiCaprio: https://www.britannica.com/biography/Leonardo-DiCaprio
- Stephen King: https://stephenking.com/the-author/
- Stephen King (biografia): https://www.britannica.com/biography/Stephen-King

Notas:
- `birthCountry: other` é usado para Marie Curie porque a versão 1 do schema ainda não inclui Polónia.
- Os campos temporais representam o período de reconhecimento público inicial, não toda a carreira.
```

## File: data/scripts/validate-people.mjs
```javascript
import { people } from "@mindguess/game-data";

console.log(`Dataset válido: ${people.length} pessoas.`);
for (const person of people) {
  console.log(`- ${person.name} (${person.slug})`);
}
```

## File: packages/entity-schema/src/index.ts
```typescript
import { z } from "zod";

export const SCHEMA_VERSION = 1 as const;

export const EntityStatusSchema = z.enum([
  "pending",
  "production",
  "rejected",
]);

export const EntityCategorySchema = z.literal("famous_person");

export const GenderSchema = z.enum([
  "male",
  "female",
  "non_binary",
  "other",
]);

export const CountrySchema = z.enum([
  "argentina",
  "australia",
  "brazil",
  "canada",
  "france",
  "germany",
  "india",
  "ireland",
  "italy",
  "japan",
  "portugal",
  "south_africa",
  "south_korea",
  "spain",
  "sweden",
  "switzerland",
  "united_kingdom",
  "united_states",
  "other",
]);

export const ContinentSchema = z.enum([
  "africa",
  "asia",
  "europe",
  "north_america",
  "south_america",
  "oceania",
  "unknown",
]);

export const PrimaryLanguageSchema = z.enum([
  "arabic",
  "chinese",
  "english",
  "french",
  "german",
  "hindi",
  "italian",
  "japanese",
  "korean",
  "portuguese",
  "russian",
  "spanish",
  "other",
]);

export const PublicAreaSchema = z.enum([
  "acting",
  "business",
  "comedy",
  "internet",
  "journalism",
  "literature",
  "music",
  "politics",
  "science",
  "sports",
  "television",
  "other",
]);

export const ProfessionSchema = z.enum([
  "actor",
  "athlete",
  "businessperson",
  "comedian",
  "content_creator",
  "director",
  "footballer",
  "journalist",
  "musician",
  "politician",
  "presenter",
  "scientist",
  "singer",
  "writer",
  "other",
]);

export const BecameFamousPeriodSchema = z.enum([
  "before_1900",
  "1900_1949",
  "1950_1979",
  "1980_1999",
  "2000_2009",
  "2010_2019",
  "2020_present",
]);

export const SportSchema = z.enum([
  "athletics",
  "basketball",
  "boxing",
  "cycling",
  "football",
  "formula_one",
  "golf",
  "gymnastics",
  "martial_arts",
  "motorsport",
  "rugby",
  "swimming",
  "tennis",
  "other",
]);

export const PersonAttributesSchema = z.object({
  alive: z.boolean().nullable(),
  gender: GenderSchema.nullable(),
  birthCountry: CountrySchema.nullable(),
  nationalities: z.array(CountrySchema).min(1),
  primaryLanguage: PrimaryLanguageSchema.nullable(),
  publicArea: PublicAreaSchema.nullable(),
  primaryProfession: ProfessionSchema.nullable(),
  professions: z.array(ProfessionSchema).min(1),
  becameFamousPeriod: BecameFamousPeriodSchema.nullable(),
  primarilyKnownInternationally: z.boolean().nullable(),
  associatedCountries: z.array(CountrySchema),
  hasActedInFilmOrTelevision: z.boolean().nullable(),
  hasReleasedMusic: z.boolean().nullable(),
  hasPresentedTelevision: z.boolean().nullable(),
  createsOnlineContent: z.boolean().nullable(),
  hasPublishedBooks: z.boolean().nullable(),
  sport: SportSchema.nullable(),
  representedNationalTeam: z.boolean().nullable(),
  heldPoliticalOffice: z.boolean().nullable(),
  foundedOrLedMajorCompany: z.boolean().nullable(),
  workedInScienceOrAcademia: z.boolean().nullable(),
  wonMajorInternationalAward: z.boolean().nullable(),
  wonOlympicMedal: z.boolean().nullable(),
  wonWorldChampionship: z.boolean().nullable(),
  hasGuinnessRecognizedRecord: z.boolean().nullable(),
}).strict();

export const FamousPersonSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: EntityCategorySchema,
  status: EntityStatusSchema,
  schemaVersion: z.literal(SCHEMA_VERSION),
  aliases: z.array(z.string().trim().min(1).max(120)),
  attributes: PersonAttributesSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
}).strict();

export type EntityStatus = z.infer<typeof EntityStatusSchema>;
export type EntityCategory = z.infer<typeof EntityCategorySchema>;
export type Gender = z.infer<typeof GenderSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type Continent = z.infer<typeof ContinentSchema>;
export type PrimaryLanguage = z.infer<typeof PrimaryLanguageSchema>;
export type PublicArea = z.infer<typeof PublicAreaSchema>;
export type Profession = z.infer<typeof ProfessionSchema>;
export type BecameFamousPeriod = z.infer<typeof BecameFamousPeriodSchema>;
export type Sport = z.infer<typeof SportSchema>;
export type PersonAttributes = z.infer<typeof PersonAttributesSchema>;
export type FamousPerson = z.infer<typeof FamousPersonSchema>;

const COUNTRY_CONTINENT: Record<Country, Continent> = {
  argentina: "south_america",
  australia: "oceania",
  brazil: "south_america",
  canada: "north_america",
  france: "europe",
  germany: "europe",
  india: "asia",
  ireland: "europe",
  italy: "europe",
  japan: "asia",
  portugal: "europe",
  south_africa: "africa",
  south_korea: "asia",
  spain: "europe",
  sweden: "europe",
  switzerland: "europe",
  united_kingdom: "europe",
  united_states: "north_america",
  other: "unknown",
};

export function getBirthContinent(
  attributes: PersonAttributes,
): Continent | null {
  return attributes.birthCountry === null
    ? null
    : COUNTRY_CONTINENT[attributes.birthCountry];
}

export function hasProfession(
  attributes: PersonAttributes,
  profession: Profession,
): boolean {
  return attributes.professions.includes(profession);
}

export function isAssociatedWith(
  attributes: PersonAttributes,
  country: Country,
): boolean {
  return attributes.associatedCountries.includes(country);
}

export function isProfessionalAthlete(
  attributes: PersonAttributes,
): boolean {
  return attributes.sport !== null || hasProfession(attributes, "athlete");
}

export function isPolitician(attributes: PersonAttributes): boolean {
  return (
    hasProfession(attributes, "politician") ||
    attributes.heldPoliticalOffice === true
  );
}

export function isScientist(attributes: PersonAttributes): boolean {
  return (
    hasProfession(attributes, "scientist") ||
    attributes.workedInScienceOrAcademia === true
  );
}

export function validateFamousPerson(input: unknown): FamousPerson {
  return FamousPersonSchema.parse(input);
}

export function safeValidateFamousPerson(input: unknown) {
  return FamousPersonSchema.safeParse(input);
}
```

## File: packages/game-engine/tests/game-ready-reason.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  finalizeGameSession,
} from "../dist/index.js";

async function loadData() {
  return { people, questions };
}

test("uma sessão ativa começa sem razão de conclusão", async () => {
  const data = await loadData();
  const session = createGameSession(data.people, data.questions);
  assert.equal(session.status, "active");
  assert.equal(session.readyReason, null);
});

test("atingir a confiança define confidence_threshold", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 0.11,
    maxTurns: 20,
  });
  const ready = answerCurrentQuestion(initial, "yes");
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.readyReason, "confidence_threshold");
});

test("atingir o máximo de turnos define turn_limit", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 1,
    maxTurns: 1,
  });
  const ready = answerCurrentQuestion(initial, "unknown");
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.readyReason, "turn_limit");
});

test("ficar sem perguntas úteis define no_useful_questions", async () => {
  const data = await loadData();
  const onlyQuestion = [data.questions.find((question) => question.id === "alive-yes")];
  const initial = createGameSession(data.people, onlyQuestion, {
    guessThreshold: 1,
    maxTurns: 20,
  });
  const ready = answerCurrentQuestion(initial, "unknown");
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.readyReason, "no_useful_questions");
});

test("a confiança tem prioridade sobre o limite de turnos", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 0.11,
    maxTurns: 1,
  });
  const ready = answerCurrentQuestion(initial, "yes");
  assert.equal(ready.readyReason, "confidence_threshold");
});

test("finalizar preserva a razão de conclusão", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 1,
    maxTurns: 1,
  });
  const ready = answerCurrentQuestion(initial, "unknown");
  const finished = finalizeGameSession(ready);
  assert.equal(finished.status, "finished");
  assert.equal(finished.readyReason, "turn_limit");
});
```

## File: packages/game-engine/tests/primary-public-area.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { questions } from "@mindguess/game-data";
import { isQuestionAvailable } from "../dist/index.js";

function loadQuestions() {
  return questions;
}

test("as áreas públicas principais partilham um grupo exclusivo", async () => {
  const questions = loadQuestions();
  const areaQuestions = questions.filter((question) =>
    question.id.startsWith("public-area-"),
  );

  assert.deepEqual(
    areaQuestions.map((question) => question.id).sort(),
    [
      "public-area-acting",
      "public-area-literature",
      "public-area-music",
      "public-area-science",
      "public-area-sports",
    ],
  );
  assert.ok(
    areaQuestions.every(
      (question) => question.exclusiveGroup === "primaryPublicArea",
    ),
  );
});

test("desporto afirmativo bloqueia música e literatura", async () => {
  const questions = loadQuestions();
  const sports = questions.find((question) => question.id === "public-area-sports");
  const music = questions.find((question) => question.id === "public-area-music");
  const literature = questions.find((question) => question.id === "public-area-literature");
  const resolved = new Set(["primaryPublicArea"]);
  const asked = new Set([sports.id]);

  assert.equal(isQuestionAvailable(music, asked, resolved), false);
  assert.equal(isQuestionAvailable(literature, asked, resolved), false);
});

test("literatura afirmativa bloqueia música e desporto", async () => {
  const questions = loadQuestions();
  const literature = questions.find((question) => question.id === "public-area-literature");
  const music = questions.find((question) => question.id === "public-area-music");
  const sports = questions.find((question) => question.id === "public-area-sports");
  const resolved = new Set(["primaryPublicArea"]);
  const asked = new Set([literature.id]);

  assert.equal(isQuestionAvailable(music, asked, resolved), false);
  assert.equal(isQuestionAvailable(sports, asked, resolved), false);
});

test("uma resposta negativa mantém outras áreas disponíveis", async () => {
  const questions = loadQuestions();
  const sports = questions.find((question) => question.id === "public-area-sports");
  const music = questions.find((question) => question.id === "public-area-music");

  assert.equal(isQuestionAvailable(music, new Set([sports.id]), new Set()), true);
});
```

## File: packages/game-engine/tests/question-evaluator.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import { evaluateQuestion } from "../dist/index.js";

async function loadData() {

  return {
    person: (slug) => people.find((item) => item.slug === slug),
    question: (id) => questions.find((item) => item.id === id),
  };
}

test("Ronaldo tem o desporto como área pública principal", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(
      data.person("cristiano-ronaldo"),
      data.question("public-area-sports"),
    ),
    "true",
  );
});

test("Taylor Swift não tem o desporto como área pública principal", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(
      data.person("taylor-swift"),
      data.question("public-area-sports"),
    ),
    "false",
  );
});

test("Einstein não está vivo", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(data.person("albert-einstein"), data.question("alive-yes")),
    "false",
  );
});

test("Messi nasceu na América do Sul", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(
      data.person("lionel-messi"),
      data.question("birth-continent-south-america"),
    ),
    "true",
  );
});

test("Rowling tem a literatura como área pública principal", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(data.person("j-k-rowling"), data.question("public-area-literature")),
    "true",
  );
});

test("um valor null produz unknown", async () => {
  const data = await loadData();
  assert.equal(
    evaluateQuestion(data.person("taylor-swift"), data.question("guinness-record")),
    "unknown",
  );
});
```

## File: data/tests/people.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people } from "@mindguess/game-data";

test("o dataset contém exatamente dez entidades", () => {
  assert.equal(people.length, 10);
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
```

## File: packages/game-engine/scripts/probability-demo.mjs
```javascript
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
```

## File: packages/game-engine/tests/game-session.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  finalizeGameSession,
  getRecommendedGuess,
} from "../dist/index.js";

async function loadData() {
  return { people, questions };
}

test("cria uma sessão ativa com distribuição uniforme", async () => {
  const data = await loadData();
  const session = createGameSession(data.people, data.questions);
  assert.equal(session.status, "active");
  assert.equal(session.turn, 0);
  assert.equal(session.history.length, 0);
  assert.notEqual(session.currentQuestion, null);
  assert.ok(session.candidates.every((candidate) => Math.abs(candidate.probability - 1 / data.people.length) < 1e-12));
});

test("sem seed preserva a melhor pergunta deterministica", async () => {
  const data = await loadData();
  const first = createGameSession(data.people, data.questions);
  const second = createGameSession(data.people, data.questions);

  assert.equal(first.currentQuestion.id, "birth-continent-europe");
  assert.equal(second.currentQuestion.id, first.currentQuestion.id);
  assert.equal(first.questionSelectionSeed, null);
  assert.equal(first.nearBestRatio, 0.95);
});

test("seeds diferentes percorrem perguntas iniciais proximas da melhor", async () => {
  const data = await loadData();
  const expectedQuestionIds = [
    "birth-continent-europe",
    "famous-2000-2009",
    "published-books",
  ];

  for (const [seed, expectedQuestionId] of expectedQuestionIds.entries()) {
    const session = createGameSession(data.people, data.questions, {
      questionSelectionSeed: seed,
      nearBestRatio: 0.95,
    });

    assert.equal(session.currentQuestion.id, expectedQuestionId);
    assert.equal(session.questionSelectionSeed, seed);
    assert.equal(session.nearBestRatio, 0.95);
  }
});

test("a mesma seed produz a mesma pergunta inicial", async () => {
  const data = await loadData();
  const first = createGameSession(data.people, data.questions, {
    questionSelectionSeed: 2,
  });
  const second = createGameSession(data.people, data.questions, {
    questionSelectionSeed: 2,
  });

  assert.equal(first.currentQuestion.id, second.currentQuestion.id);
});

test("a configuracao de selecao permanece depois de uma resposta", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    questionSelectionSeed: 1,
    nearBestRatio: 0.95,
    guessThreshold: 1,
  });
  const updated = answerCurrentQuestion(initial, "unknown");

  assert.equal(updated.questionSelectionSeed, 1);
  assert.equal(updated.nearBestRatio, 0.95);
  assert.notEqual(updated.currentQuestion?.id, initial.currentQuestion.id);
});
test("regista uma resposta no histórico", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions);
  const questionId = initial.currentQuestion.id;
  const updated = answerCurrentQuestion(initial, "yes");
  assert.equal(updated.turn, 1);
  assert.equal(updated.history.length, 1);
  assert.equal(updated.history[0].question.id, questionId);
  assert.equal(updated.history[0].answer, "yes");
  assert.deepEqual(updated.askedQuestionIds, [questionId]);
});

test("não altera a sessão anterior", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions);
  answerCurrentQuestion(initial, "no");
  assert.equal(initial.turn, 0);
  assert.equal(initial.history.length, 0);
  assert.equal(initial.askedQuestionIds.length, 0);
});

test("não repete a pergunta anterior", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions);
  const askedId = initial.currentQuestion.id;
  const updated = answerCurrentQuestion(initial, "unknown");
  if (updated.status === "active") {
    assert.notEqual(updated.currentQuestion.id, askedId);
  }
});

test("fica pronta para adivinhar ao atingir o limite de turnos", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    maxTurns: 1,
    guessThreshold: 1,
  });
  const updated = answerCurrentQuestion(initial, "unknown");
  assert.equal(updated.status, "ready_to_guess");
  assert.equal(updated.currentQuestion, null);
});

test("fica pronta para adivinhar ao atingir a confiança configurada", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, {
    guessThreshold: 0.11,
    maxTurns: 20,
  });
  const updated = answerCurrentQuestion(initial, "yes");
  assert.equal(updated.status, "ready_to_guess");
});

test("devolve o candidato recomendado", async () => {
  const data = await loadData();
  const session = createGameSession(data.people, data.questions);
  const guess = getRecommendedGuess(session);
  assert.ok(data.people.some((person) => person.slug === guess.person.slug));
  assert.equal(guess.probability, 1 / data.people.length);
});

test("finaliza a sessão com uma sugestão imutável", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, { maxTurns: 1 });
  const ready = answerCurrentQuestion(initial, "unknown");
  const finished = finalizeGameSession(ready);
  assert.equal(finished.status, "finished");
  assert.notEqual(finished.finalGuess, null);
  assert.equal(ready.status, "ready_to_guess");
  assert.equal(ready.finalGuess, null);
});

test("rejeita respostas depois de a sessão terminar", async () => {
  const data = await loadData();
  const initial = createGameSession(data.people, data.questions, { maxTurns: 1 });
  const ready = answerCurrentQuestion(initial, "unknown");
  const finished = finalizeGameSession(ready);
  assert.throws(() => answerCurrentQuestion(finished, "yes"), /não aceita novas respostas/);
});

test("rejeita configurações e entradas inválidas", async () => {
  const data = await loadData();
  assert.throws(() => createGameSession([], data.questions), /sem candidatos/);
  assert.throws(() => createGameSession(data.people, []), /sem perguntas/);
  assert.throws(() => createGameSession(data.people, data.questions, { guessThreshold: 0 }), /guessThreshold/);
  assert.throws(() => createGameSession(data.people, data.questions, { maxTurns: 0 }), /maxTurns/);
  assert.throws(
    () => createGameSession(data.people, data.questions, { nearBestRatio: 0 }),
    /nearBestRatio/,
  );
  assert.throws(
    () => createGameSession(data.people, data.questions, { nearBestRatio: 1.01 }),
    /nearBestRatio/,
  );
  assert.throws(
    () => createGameSession(data.people, data.questions, { questionSelectionSeed: -1 }),
    /questionSelectionSeed/,
  );
  assert.throws(
    () => createGameSession(data.people, data.questions, { questionSelectionSeed: 1.5 }),
    /questionSelectionSeed/,
  );
});
```

## File: packages/game-engine/tests/probability.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  createUniformDistribution,
  getTopCandidate,
  rankCandidates,
  updateDistribution,
} from "../dist/index.js";

async function loadData() {

  return {
    people,
    question: (id) => questions.find((question) => question.id === id),
  };
}

function sumProbabilities(candidates) {
  return candidates.reduce((sum, candidate) => sum + candidate.probability, 0);
}

test("a distribuição inicial é uniforme e soma 1", async () => {
  const { people } = await loadData();
  const distribution = createUniformDistribution(people);

  assert.equal(distribution.length, 10);
  for (const candidate of distribution) {
    assert.ok(Math.abs(candidate.probability - 0.1) < 1e-12);
  }
  assert.ok(Math.abs(sumProbabilities(distribution) - 1) < 1e-12);
});

test("uma resposta yes aumenta as pessoas cuja área principal é o desporto", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("public-area-sports"), "yes");
  const ranked = rankCandidates(updated);

  assert.deepEqual(
    ranked.slice(0, 3).map((candidate) => candidate.person.slug).sort(),
    ["cristiano-ronaldo", "kylian-mbappe", "lionel-messi"],
  );
  assert.ok(ranked[0].probability > 0.1);
  assert.ok(Math.abs(sumProbabilities(updated) - 1) < 1e-12);
});

test("uma resposta no reduz as pessoas cuja área principal é o desporto", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("public-area-sports"), "no");
  const bySlug = Object.fromEntries(
    updated.map((candidate) => [candidate.person.slug, candidate.probability]),
  );

  assert.ok(bySlug["taylor-swift"] > bySlug["cristiano-ronaldo"]);
  assert.ok(bySlug["j-k-rowling"] > bySlug["lionel-messi"]);
});

test("maybe atualiza com menos força do que yes", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const yes = updateDistribution(initial, data.question("public-area-sports"), "yes");
  const maybe = updateDistribution(initial, data.question("public-area-sports"), "maybe");
  const yesTop = getTopCandidate(yes);
  const maybeTop = getTopCandidate(maybe);

  assert.ok(yesTop.probability > maybeTop.probability);
  assert.ok(maybeTop.probability > 0.1);
});

test("unknown não altera a distribuição", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("public-area-sports"), "unknown");

  assert.deepEqual(updated, initial);
  assert.notEqual(updated, initial);
});

test("valores desconhecidos não são tratados como false", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const updated = updateDistribution(initial, data.question("guinness-record"), "yes");
  const bySlug = Object.fromEntries(
    updated.map((candidate) => [candidate.person.slug, candidate.probability]),
  );

  assert.ok(bySlug["taylor-swift"] > bySlug["albert-einstein"]);
  assert.ok(bySlug["j-k-rowling"] > bySlug["albert-einstein"]);
});

test("o ranking usa slug como desempate determinístico", async () => {
  const { people } = await loadData();
  const ranked = rankCandidates(createUniformDistribution(people));
  const expected = people.map((person) => person.slug).sort();

  assert.deepEqual(ranked.map((candidate) => candidate.person.slug), expected);
});

test("uma lista vazia é rejeitada", () => {
  assert.throws(() => createUniformDistribution([]), /sem candidatos/);
});
```

## File: packages/game-engine/scripts/dataset-simulator.mjs
```javascript
import { people, questions } from "@mindguess/game-data";
import {
  answerCurrentQuestion,
  createGameSession,
  createUniformDistribution,
  evaluateQuestion,
  finalizeGameSession,
  getRecommendedGuess,
  rankQuestions,
} from "../dist/index.js";

function evaluationToAnswer(evaluation) {
  if (evaluation === "true") return "yes";
  if (evaluation === "false") return "no";
  return "unknown";
}

function simulatePerson(secretPerson, people, questions) {
  let session = createGameSession(people, questions, {
    guessThreshold: 0.85,
    maxTurns: 12,
  });
  let unknownAnswers = 0;

  while (session.status === "active") {
    const evaluation = evaluateQuestion(secretPerson, session.currentQuestion);
    const answer = evaluationToAnswer(evaluation);
    if (answer === "unknown") unknownAnswers += 1;
    session = answerCurrentQuestion(session, answer);
  }

  const recommendation = getRecommendedGuess(session);
  session = finalizeGameSession(session);

  return {
    name: secretPerson.name,
    slug: secretPerson.slug,
    guessedSlug: recommendation.person.slug,
    guessedName: recommendation.person.name,
    correct: recommendation.person.slug === secretPerson.slug,
    turns: session.turn,
    confidence: recommendation.probability,
    unknownAnswers,
    readyReason: session.readyReason,
    questionIds: session.history.map((turn) => turn.question.id),
  };
}

const results = people.map((person) => simulatePerson(person, people, questions));

console.log("MindGuess - simulador do dataset");
console.log("================================");
for (const result of results) {
  const status = result.correct ? "CORRETO" : "INCORRETO";
  const confidence = `${(result.confidence * 100).toFixed(2)}%`;
  console.log(
    `${result.name.padEnd(20)} ${status.padEnd(10)} ` +
    `${String(result.turns).padStart(2)} turnos  ` +
    `${confidence.padStart(7)}  unknown: ${result.unknownAnswers}`,
  );
  if (!result.correct) {
    console.log(`  Tentativa incorreta: ${result.guessedName}`);
  }
}

const successCount = results.filter((result) => result.correct).length;
const averageTurns = results.reduce((sum, result) => sum + result.turns, 0) / results.length;
const averageConfidence = results.reduce((sum, result) => sum + result.confidence, 0) / results.length;
const totalUnknown = results.reduce((sum, result) => sum + result.unknownAnswers, 0);

const questionUsage = new Map();
const firstQuestionUsage = new Map();
const pathUsage = new Map();
const readyReasonUsage = new Map();

for (const result of results) {
  for (const questionId of result.questionIds) {
    questionUsage.set(questionId, (questionUsage.get(questionId) ?? 0) + 1);
  }

  const firstQuestionId = result.questionIds[0];
  if (firstQuestionId !== undefined) {
    firstQuestionUsage.set(
      firstQuestionId,
      (firstQuestionUsage.get(firstQuestionId) ?? 0) + 1,
    );
  }

  const path = result.questionIds.join(" -> ");
  pathUsage.set(path, (pathUsage.get(path) ?? 0) + 1);
  readyReasonUsage.set(
    result.readyReason,
    (readyReasonUsage.get(result.readyReason) ?? 0) + 1,
  );
}

function sortUsage(usage) {
  return [...usage.entries()].sort((left, right) => {
    const countDifference = right[1] - left[1];
    return countDifference !== 0
      ? countDifference
      : String(left[0]).localeCompare(String(right[0]));
  });
}

function countQuestionEvaluations(people, question) {
  const counts = {
    true: 0,
    false: 0,
    unknown: 0,
  };

  for (const person of people) {
    const evaluation = evaluateQuestion(person, question);
    counts[evaluation] += 1;
  }

  return counts;
}
const initialDistribution = createUniformDistribution(people);
const initialQuestionRanking = rankQuestions(
  initialDistribution,
  questions,
);
const bestInitialInformationGain =
  initialQuestionRanking[0]?.informationGain ?? 0;
const unusedQuestionIds = questions
  .map((question) => question.id)
  .filter((questionId) => !questionUsage.has(questionId))
  .sort();

console.log("\nResumo");
console.log("------");
console.log(`Taxa de sucesso: ${successCount}/${results.length}`);
console.log(`Média de turnos: ${averageTurns.toFixed(2)}`);
console.log(`Confiança média: ${(averageConfidence * 100).toFixed(2)}%`);
console.log(`Respostas unknown: ${totalUnknown}`);

console.log("\nRanking inicial por ganho de informação");
console.log("----------------------------------------");
console.log(
  `${"Pergunta".padEnd(34)} ${"Ganho".padStart(10)} ` +
  `${"Entropia".padStart(10)} ${"Relativo".padStart(10)} ` +
  `${"True".padStart(6)} ${"False".padStart(6)} ${"Unknown".padStart(8)}`,
);

for (const score of initialQuestionRanking.slice(0, 10)) {
  const relativePercentage =
    bestInitialInformationGain === 0
      ? 0
      : (score.informationGain / bestInitialInformationGain) * 100;

  const evaluationCounts = countQuestionEvaluations(
    people,
    score.question,
  );
  console.log(
    `${score.question.id.padEnd(34)} ` +
    `${score.informationGain.toFixed(4).padStart(10)} ` +
    `${score.expectedEntropy.toFixed(4).padStart(10)} ` +
    `${`${relativePercentage.toFixed(1)}%`.padStart(10)} ` +
    `${String(evaluationCounts.true).padStart(6)} ` +
    `${String(evaluationCounts.false).padStart(6)} ` +
    `${String(evaluationCounts.unknown).padStart(8)}`,
  );
}
console.log("\nRazões de conclusão");
console.log("--------------------");
for (const [reason, count] of sortUsage(readyReasonUsage)) {
  console.log(`${String(reason).padEnd(24)} ${count}/${results.length}`);
}

console.log("\nPerguntas iniciais");
console.log("------------------");
for (const [questionId, count] of sortUsage(firstQuestionUsage)) {
  console.log(`${questionId.padEnd(34)} ${count}/${results.length}`);
}

console.log("\nFrequência das perguntas");
console.log("------------------------");
for (const [questionId, count] of sortUsage(questionUsage)) {
  const percentage = ((count / results.length) * 100).toFixed(0);
  console.log(
    `${questionId.padEnd(34)} ${String(count).padStart(2)}/${results.length}  ` +
    `${percentage.padStart(3)}%`,
  );
}

console.log("\nPerguntas nunca utilizadas");
console.log("--------------------------");
if (unusedQuestionIds.length === 0) {
  console.log("Nenhuma.");
} else {
  for (const questionId of unusedQuestionIds) console.log(`- ${questionId}`);
}

console.log("\nPercursos repetidos");
console.log("-------------------");
const repeatedPaths = sortUsage(pathUsage).filter(([, count]) => count > 1);
if (repeatedPaths.length === 0) {
  console.log("Nenhum percurso completo foi repetido.");
} else {
  for (const [path, count] of repeatedPaths) {
    console.log(`${count}x ${path}`);
  }
}

if (successCount !== results.length) {
  process.exitCode = 1;
  throw new Error("O motor não identificou corretamente todas as pessoas do dataset.");
}
```

## File: packages/game-engine/tests/question-selection.test.mjs
```javascript
import assert from "node:assert/strict";
import test from "node:test";
import { people, questions } from "@mindguess/game-data";
import {
  calculateEntropy,
  createUniformDistribution,
  evaluateQuestion,
  rankQuestions,
  scoreQuestion,
  selectNearBestQuestion,
  selectNextQuestion,
  updateDistribution,
} from "../dist/index.js";

async function loadData() {

  return {
    people,
    questions,
    question: (id) => questions.find((question) => question.id === id),
  };
}

test("a entropia de candidatos uniformes é log2 do total", async () => {
  const data = await loadData();
  const entropy = calculateEntropy(createUniformDistribution(data.people));
  assert.ok(Math.abs(entropy - Math.log2(data.people.length)) < 1e-12);
});

test("uma distribuição certa tem entropia zero", async () => {
  const data = await loadData();
  assert.equal(calculateEntropy([{ person: data.people[0], probability: 1 }]), 0);
});

test("uma pergunta útil tem ganho de informação positivo", async () => {
  const data = await loadData();
  const score = scoreQuestion(
    createUniformDistribution(data.people),
    data.question("public-area-sports"),
  );
  assert.ok(score.informationGain > 0);
  assert.ok(score.expectedEntropy < Math.log2(data.people.length));
});

test("a pontuação representa as atualizações reais da partida", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const question = data.question("guinness-record");
  const score = scoreQuestion(initial, question);

  const evaluationProbabilities = {
    true: 0,
    false: 0,
    unknown: 0,
  };

  for (const candidate of initial) {
    const evaluation = evaluateQuestion(candidate.person, question);
    evaluationProbabilities[evaluation] += candidate.probability;
  }

  const afterYes = updateDistribution(initial, question, "yes");
  const afterNo = updateDistribution(initial, question, "no");
  const afterUnknown = updateDistribution(initial, question, "unknown");

  const expectedEntropy =
    evaluationProbabilities.true * calculateEntropy(afterYes) +
    evaluationProbabilities.false * calculateEntropy(afterNo) +
    evaluationProbabilities.unknown * calculateEntropy(afterUnknown);

  const expectedInformationGain =
    calculateEntropy(initial) - expectedEntropy;

  assert.ok(
    Math.abs(score.expectedEntropy - expectedEntropy) < 1e-12,
  );
  assert.ok(
    Math.abs(score.informationGain - expectedInformationGain) < 1e-12,
  );
});
test("uma pergunta que produz a mesma resposta para todos é ignorada", async () => {
  const data = await loadData();
  const uselessQuestion = {
    id: "all-international",
    source: "stored",
    attribute: "primarilyKnownInternationally",
    operator: "equals",
    expectedValue: true,
    canonicalText: "É conhecida internacionalmente?",
  };
  const score = scoreQuestion(createUniformDistribution(data.people), uselessQuestion);
  assert.equal(score.informationGain, 0);
  assert.equal(rankQuestions(createUniformDistribution(data.people), [uselessQuestion]).length, 0);
});

test("a seleção próxima da melhor devolve null para uma lista vazia", () => {
  assert.equal(selectNearBestQuestion([], 0.95, 0), null);
});

test("a seleção próxima da melhor escolhe a melhor sem índice variável", async () => {
  const data = await loadData();
  const ranked = rankQuestions(
    createUniformDistribution(data.people),
    data.questions,
  );

  const selected = selectNearBestQuestion(ranked, 0.95, 0);

  assert.notEqual(selected, null);
  assert.equal(selected.question.id, ranked[0].question.id);
});

test("índices diferentes percorrem apenas perguntas próximas da melhor", async () => {
  const data = await loadData();
  const ranked = rankQuestions(
    createUniformDistribution(data.people),
    data.questions,
  );
  const bestGain = ranked[0].informationGain;
  const eligible = ranked.filter(
    (score) => score.informationGain >= bestGain * 0.95 - 1e-12,
  );

  assert.ok(eligible.length >= 3);

  for (let index = 0; index < eligible.length * 2; index += 1) {
    const selected = selectNearBestQuestion(ranked, 0.95, index);
    assert.notEqual(selected, null);
    assert.equal(
      selected.question.id,
      eligible[index % eligible.length].question.id,
    );
  }
});

test("a seleção próxima da melhor nunca escolhe abaixo do limiar", async () => {
  const data = await loadData();
  const ranked = rankQuestions(
    createUniformDistribution(data.people),
    data.questions,
  );
  const bestGain = ranked[0].informationGain;
  const eligibleIds = new Set(
    ranked
      .filter(
        (score) => score.informationGain >= bestGain * 0.95 - 1e-12,
      )
      .map((score) => score.question.id),
  );

  for (let index = 0; index < 100; index += 1) {
    const selected = selectNearBestQuestion(ranked, 0.95, index);
    assert.notEqual(selected, null);
    assert.equal(eligibleIds.has(selected.question.id), true);
  }
});
test("perguntas já feitas não voltam a ser selecionadas", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const first = selectNextQuestion(initial, data.questions);
  assert.notEqual(first, null);
  const second = selectNextQuestion(
    initial,
    data.questions,
    new Set([first.question.id]),
  );
  assert.notEqual(second, null);
  assert.notEqual(second.question.id, first.question.id);
});

test("o ranking é ordenado por ganho de informação decrescente", async () => {
  const data = await loadData();
  const ranked = rankQuestions(createUniformDistribution(data.people), data.questions);
  assert.ok(ranked.length > 1);
  for (let index = 1; index < ranked.length; index += 1) {
    assert.ok(ranked[index - 1].informationGain + 1e-12 >= ranked[index].informationGain);
  }
});

test("empates usam o ID da pergunta de forma determinística", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const questionA = {
    ...data.question("public-area-sports"),
    id: "a-sports",
  };
  const questionB = {
    ...data.question("public-area-sports"),
    id: "b-sports",
  };
  const ranked = rankQuestions(initial, [questionB, questionA]);
  assert.deepEqual(ranked.map((score) => score.question.id), ["a-sports", "b-sports"]);
});

test("a melhor pergunta pode mudar depois de uma resposta", async () => {
  const data = await loadData();
  const initial = createUniformDistribution(data.people);
  const sportsQuestion = data.question("public-area-sports");
  const updated = updateDistribution(initial, sportsQuestion, "no");
  const next = selectNextQuestion(updated, data.questions, new Set([sportsQuestion.id]));
  assert.notEqual(next, null);
  assert.notEqual(next.question.id, sportsQuestion.id);
  assert.ok(next.informationGain > 0);
});

test("devolve null quando não existem perguntas úteis disponíveis", async () => {
  const data = await loadData();
  const certain = data.people.map((person, index) => ({
    person,
    probability: index === 0 ? 1 : 0,
  }));
  assert.equal(selectNextQuestion(certain, data.questions), null);
});
```

## File: packages/game-engine/package.json
```json
{
  "name": "@mindguess/game-engine",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "npm run build && node --test tests/*.test.mjs",
    "demo:probability": "npm run build && node scripts/probability-demo.mjs",
    "demo:game": "npm run build && node scripts/automatic-game-demo.mjs",
    "simulate:dataset": "npm run build && node scripts/dataset-simulator.mjs",
    "simulate:seeds": "npm run build && node scripts/seed-comparison.mjs"
  },
  "dependencies": {
    "@mindguess/entity-schema": "0.1.0"
  },
  "devDependencies": {
    "@mindguess/game-data": "0.1.0"
  }
}
```

## File: packages/game-engine/src/index.ts
```typescript
import {
  getBirthContinent,
  type FamousPerson,
} from "@mindguess/entity-schema";

export const QUESTION_SOURCES = ["stored", "derived"] as const;
export type QuestionSource = (typeof QUESTION_SOURCES)[number];

export const QUESTION_OPERATORS = ["equals", "contains", "is_not_null"] as const;
export type QuestionOperator = (typeof QUESTION_OPERATORS)[number];

export const EVALUATION_RESULTS = ["true", "false", "unknown"] as const;
export type EvaluationResult = (typeof EVALUATION_RESULTS)[number];

export type QuestionValue = string | boolean;

export interface Question {
  readonly id: string;
  readonly source: QuestionSource;
  readonly attribute: string;
  readonly operator: QuestionOperator;
  readonly expectedValue: QuestionValue;
  readonly canonicalText: string;
  readonly exclusiveGroup?: string;
}

function evaluateValue(
  actualValue: unknown,
  operator: QuestionOperator,
  expectedValue: QuestionValue,
): EvaluationResult {
  if (actualValue === null || actualValue === undefined) {
    return operator === "is_not_null" ? "false" : "unknown";
  }

  if (operator === "is_not_null") {
    return "true";
  }

  if (operator === "contains") {
    if (!Array.isArray(actualValue)) {
      return "unknown";
    }

    return actualValue.includes(expectedValue) ? "true" : "false";
  }

  return actualValue === expectedValue ? "true" : "false";
}

function getDerivedValue(person: FamousPerson, attribute: string): unknown {
  switch (attribute) {
    case "birthContinent":
      return getBirthContinent(person.attributes);
    default:
      return undefined;
  }
}

export function evaluateQuestion(
  person: FamousPerson,
  question: Question,
): EvaluationResult {
  const actualValue =
    question.source === "derived"
      ? getDerivedValue(person, question.attribute)
      : person.attributes[
          question.attribute as keyof FamousPerson["attributes"]
        ];

  return evaluateValue(
    actualValue,
    question.operator,
    question.expectedValue,
  );
}

export type PlayerAnswer = "yes" | "no" | "maybe" | "unknown";

export interface CandidateProbability {
  readonly person: FamousPerson;
  readonly probability: number;
}

const ANSWER_LIKELIHOODS: Readonly<
  Record<PlayerAnswer, Readonly<Record<EvaluationResult, number>>>
> = {
  yes: {
    true: 0.9,
    false: 0.1,
    unknown: 0.5,
  },
  no: {
    true: 0.1,
    false: 0.9,
    unknown: 0.5,
  },
  maybe: {
    true: 0.65,
    false: 0.35,
    unknown: 0.5,
  },
  unknown: {
    true: 1,
    false: 1,
    unknown: 1,
  },
};

export function createUniformDistribution(
  people: readonly FamousPerson[],
): CandidateProbability[] {
  if (people.length === 0) {
    throw new Error("Não é possível criar uma distribuição sem candidatos.");
  }

  const probability = 1 / people.length;
  return people.map((person) => ({ person, probability }));
}

export function normalizeDistribution(
  candidates: readonly CandidateProbability[],
): CandidateProbability[] {
  const total = candidates.reduce(
    (sum, candidate) => sum + candidate.probability,
    0,
  );

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error("A distribuição não pode ser normalizada.");
  }

  return candidates.map((candidate) => ({
    person: candidate.person,
    probability: candidate.probability / total,
  }));
}

export function updateDistribution(
  candidates: readonly CandidateProbability[],
  question: Question,
  answer: PlayerAnswer,
): CandidateProbability[] {
  if (answer === "unknown") {
    return candidates.map((candidate) => ({ ...candidate }));
  }

  const weighted = candidates.map((candidate) => {
    const evaluation = evaluateQuestion(candidate.person, question);
    const likelihood = ANSWER_LIKELIHOODS[answer][evaluation];

    return {
      person: candidate.person,
      probability: candidate.probability * likelihood,
    };
  });

  return normalizeDistribution(weighted);
}

export function rankCandidates(
  candidates: readonly CandidateProbability[],
): CandidateProbability[] {
  return [...candidates].sort((left, right) => {
    const probabilityDifference = right.probability - left.probability;
    if (probabilityDifference !== 0) {
      return probabilityDifference;
    }

    return left.person.slug.localeCompare(right.person.slug);
  });
}

export function getTopCandidate(
  candidates: readonly CandidateProbability[],
): CandidateProbability {
  const topCandidate = rankCandidates(candidates)[0];
  if (topCandidate === undefined) {
    throw new Error("Não existem candidatos disponíveis.");
  }

  return topCandidate;
}

export interface QuestionScore {
  readonly question: Question;
  readonly informationGain: number;
  readonly expectedEntropy: number;
}

export function calculateEntropy(
  candidates: readonly CandidateProbability[],
): number {
  return candidates.reduce((entropy, candidate) => {
    const probability = candidate.probability;
    if (probability <= 0) {
      return entropy;
    }

    return entropy - probability * Math.log2(probability);
  }, 0);
}

export function scoreQuestion(
  candidates: readonly CandidateProbability[],
  question: Question,
): QuestionScore {
  const normalized = normalizeDistribution(candidates);
  const currentEntropy = calculateEntropy(normalized);
  const evaluationProbabilities = new Map<EvaluationResult, number>();

  for (const candidate of normalized) {
    const evaluation = evaluateQuestion(candidate.person, question);
    evaluationProbabilities.set(
      evaluation,
      (evaluationProbabilities.get(evaluation) ?? 0) +
        candidate.probability,
    );
  }

  const answerForEvaluation: Readonly<
    Record<EvaluationResult, PlayerAnswer>
  > = {
    true: "yes",
    false: "no",
    unknown: "unknown",
  };

  let expectedEntropy = 0;

  for (const evaluation of EVALUATION_RESULTS) {
    const evaluationProbability =
      evaluationProbabilities.get(evaluation) ?? 0;

    if (evaluationProbability <= 0) {
      continue;
    }

    const posteriorDistribution = updateDistribution(
      normalized,
      question,
      answerForEvaluation[evaluation],
    );

    expectedEntropy +=
      evaluationProbability *
      calculateEntropy(posteriorDistribution);
  }

  const rawInformationGain = currentEntropy - expectedEntropy;
  const informationGain =
    Math.abs(rawInformationGain) < 1e-12
      ? 0
      : rawInformationGain;

  return { question, informationGain, expectedEntropy };
}
export function isQuestionAvailable(
  question: Question,
  askedQuestionIds: ReadonlySet<string> = new Set(),
  resolvedExclusiveGroups: ReadonlySet<string> = new Set(),
): boolean {
  if (askedQuestionIds.has(question.id)) {
    return false;
  }

  return !(
    question.exclusiveGroup !== undefined &&
    resolvedExclusiveGroups.has(question.exclusiveGroup)
  );
}

export function rankQuestions(
  candidates: readonly CandidateProbability[],
  questions: readonly Question[],
  askedQuestionIds: ReadonlySet<string> = new Set(),
  resolvedExclusiveGroups: ReadonlySet<string> = new Set(),
): QuestionScore[] {
  return questions
    .filter((question) =>
      isQuestionAvailable(
        question,
        askedQuestionIds,
        resolvedExclusiveGroups,
      ),
    )
    .map((question) => scoreQuestion(candidates, question))
    .filter((score) => score.informationGain > 1e-12)
    .sort((left, right) => {
      const gainDifference = right.informationGain - left.informationGain;
      if (Math.abs(gainDifference) > 1e-12) {
        return gainDifference;
      }

      return left.question.id.localeCompare(right.question.id);
    });
}

export function selectNearBestQuestion(
  rankedQuestions: readonly QuestionScore[],
  nearBestRatio: number,
  selectionIndex: number,
): QuestionScore | null {
  if (
    !Number.isFinite(nearBestRatio) ||
    nearBestRatio <= 0 ||
    nearBestRatio > 1
  ) {
    throw new Error("nearBestRatio tem de estar no intervalo ]0, 1].");
  }

  if (!Number.isInteger(selectionIndex) || selectionIndex < 0) {
    throw new Error(
      "selectionIndex tem de ser um inteiro não negativo.",
    );
  }

  const bestQuestion = rankedQuestions[0];

  if (bestQuestion === undefined) {
    return null;
  }

  const minimumGain =
    bestQuestion.informationGain * nearBestRatio;

  const eligibleQuestions = rankedQuestions.filter(
    (score) =>
      score.informationGain >= minimumGain - 1e-12,
  );

  return (
    eligibleQuestions[
      selectionIndex % eligibleQuestions.length
    ] ?? null
  );
}
export interface QuestionSelectionOptions {
  readonly nearBestRatio: number;
  readonly selectionIndex: number;
}

export function selectNextQuestion(
  candidates: readonly CandidateProbability[],
  questions: readonly Question[],
  askedQuestionIds: ReadonlySet<string> = new Set(),
  resolvedExclusiveGroups: ReadonlySet<string> = new Set(),
  selectionOptions?: QuestionSelectionOptions,
): QuestionScore | null {
  const rankedQuestions = rankQuestions(
    candidates,
    questions,
    askedQuestionIds,
    resolvedExclusiveGroups,
  );

  if (selectionOptions === undefined) {
    return rankedQuestions[0] ?? null;
  }

  return selectNearBestQuestion(
    rankedQuestions,
    selectionOptions.nearBestRatio,
    selectionOptions.selectionIndex,
  );
}

export type GameStatus = "active" | "ready_to_guess" | "finished";

export type GameReadyReason =
  | "confidence_threshold"
  | "turn_limit"
  | "no_useful_questions";

export interface GameTurn {
  readonly turn: number;
  readonly question: Question;
  readonly answer: PlayerAnswer;
  readonly topCandidateSlug: string;
  readonly topCandidateProbability: number;
}

export interface GameSessionOptions {
  readonly guessThreshold?: number;
  readonly maxTurns?: number;
  readonly nearBestRatio?: number;
  readonly questionSelectionSeed?: number;
}

interface ValidatedGameSessionOptions {
  readonly guessThreshold: number;
  readonly maxTurns: number;
  readonly nearBestRatio: number;
  readonly questionSelectionSeed: number | null;
}

export interface GameSession {
  readonly candidates: readonly CandidateProbability[];
  readonly questions: readonly Question[];
  readonly askedQuestionIds: readonly string[];
  readonly resolvedExclusiveGroups: readonly string[];
  readonly history: readonly GameTurn[];
  readonly turn: number;
  readonly status: GameStatus;
  readonly readyReason: GameReadyReason | null;
  readonly currentQuestion: Question | null;
  readonly guessThreshold: number;
  readonly maxTurns: number;
  readonly nearBestRatio: number;
  readonly questionSelectionSeed: number | null;
  readonly finalGuess: CandidateProbability | null;
}

function validateSessionOptions(
  options: GameSessionOptions,
): ValidatedGameSessionOptions {
  const guessThreshold = options.guessThreshold ?? 0.85;
  const maxTurns = options.maxTurns ?? 20;
  const nearBestRatio = options.nearBestRatio ?? 0.95;
  const questionSelectionSeed =
    options.questionSelectionSeed ?? null;

  if (
    !Number.isFinite(guessThreshold) ||
    guessThreshold <= 0 ||
    guessThreshold > 1
  ) {
    throw new Error("guessThreshold tem de estar no intervalo ]0, 1].");
  }

  if (!Number.isInteger(maxTurns) || maxTurns <= 0) {
    throw new Error("maxTurns tem de ser um inteiro positivo.");
  }

  if (
    !Number.isFinite(nearBestRatio) ||
    nearBestRatio <= 0 ||
    nearBestRatio > 1
  ) {
    throw new Error("nearBestRatio tem de estar no intervalo ]0, 1].");
  }

  if (
    questionSelectionSeed !== null &&
    (!Number.isSafeInteger(questionSelectionSeed) ||
      questionSelectionSeed < 0)
  ) {
    throw new Error(
      "questionSelectionSeed tem de ser um inteiro seguro nao negativo.",
    );
  }

  return {
    guessThreshold,
    maxTurns,
    nearBestRatio,
    questionSelectionSeed,
  };
}
export function createGameSession(
  people: readonly FamousPerson[],
  questions: readonly Question[],
  options: GameSessionOptions = {},
): GameSession {
  if (questions.length === 0) {
    throw new Error("Não é possível iniciar uma sessão sem perguntas.");
  }

  const {
    guessThreshold,
    maxTurns,
    nearBestRatio,
    questionSelectionSeed,
  } = validateSessionOptions(options);
  const candidates = createUniformDistribution(people);
  const nextQuestion = selectNextQuestion(
    candidates,
    questions,
    new Set(),
    new Set(),
    questionSelectionSeed === null
      ? undefined
      : {
          nearBestRatio,
          selectionIndex: questionSelectionSeed,
        },
  );

  return {
    candidates,
    questions: [...questions],
    askedQuestionIds: [],
    resolvedExclusiveGroups: [],
    history: [],
    turn: 0,
    status: nextQuestion === null ? "ready_to_guess" : "active",
    readyReason: nextQuestion === null ? "no_useful_questions" : null,
    currentQuestion: nextQuestion?.question ?? null,
    guessThreshold,
    maxTurns,
    nearBestRatio,
    questionSelectionSeed,
    finalGuess: null,
  };
}

export function answerCurrentQuestion(
  session: GameSession,
  answer: PlayerAnswer,
): GameSession {
  if (session.status !== "active" || session.currentQuestion === null) {
    throw new Error("A sessão não aceita novas respostas.");
  }

  const turn = session.turn + 1;
  const candidates = updateDistribution(
    session.candidates,
    session.currentQuestion,
    answer,
  );
  const topCandidate = getTopCandidate(candidates);
  const askedQuestionIds = [
    ...session.askedQuestionIds,
    session.currentQuestion.id,
  ];
  const resolvedExclusiveGroups =
    answer === "yes" && session.currentQuestion.exclusiveGroup !== undefined
      ? Array.from(
          new Set([
            ...session.resolvedExclusiveGroups,
            session.currentQuestion.exclusiveGroup,
          ]),
        )
      : [...session.resolvedExclusiveGroups];
  const history = [
    ...session.history,
    {
      turn,
      question: session.currentQuestion,
      answer,
      topCandidateSlug: topCandidate.person.slug,
      topCandidateProbability: topCandidate.probability,
    },
  ];
  const reachedThreshold =
    topCandidate.probability >= session.guessThreshold;
  const reachedTurnLimit = turn >= session.maxTurns;
  const nextQuestion = reachedThreshold || reachedTurnLimit
    ? null
    : selectNextQuestion(
        candidates,
        session.questions,
        new Set(askedQuestionIds),
        new Set(resolvedExclusiveGroups),
        session.questionSelectionSeed === null
          ? undefined
          : {
              nearBestRatio: session.nearBestRatio,
              selectionIndex:
                session.questionSelectionSeed + turn,
            },
      );
  const readyToGuess =
    reachedThreshold || reachedTurnLimit || nextQuestion === null;
  const readyReason: GameReadyReason | null = reachedThreshold
    ? "confidence_threshold"
    : reachedTurnLimit
      ? "turn_limit"
      : nextQuestion === null
        ? "no_useful_questions"
        : null;

  return {
    ...session,
    candidates,
    askedQuestionIds,
    resolvedExclusiveGroups,
    history,
    turn,
    status: readyToGuess ? "ready_to_guess" : "active",
    readyReason,
    currentQuestion: readyToGuess ? null : nextQuestion.question,
  };
}

export function getRecommendedGuess(
  session: GameSession,
): CandidateProbability {
  return getTopCandidate(session.candidates);
}

export function finalizeGameSession(session: GameSession): GameSession {
  if (session.status !== "ready_to_guess") {
    throw new Error("A sessão ainda não está pronta para adivinhar.");
  }

  return {
    ...session,
    status: "finished",
    currentQuestion: null,
    finalGuess: getRecommendedGuess(session),
  };
}
```
