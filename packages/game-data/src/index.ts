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
