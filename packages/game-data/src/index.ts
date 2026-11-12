import {
  FamousPersonSchema,
  type PersonAttributes,
} from "@mindguess/entity-schema";

const RAW_PEOPLE = [
{
  "id": "21d3a875-0d0a-5b01-bfa2-e15743c8f642",
  "name": "Cristiano Ronaldo",
  "slug": "cristiano-ronaldo",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "ballon_dor_winner",
      "champions_league_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "2df29cb9-8776-5373-9b46-5791570bbc68",
  "name": "Lionel Messi",
  "slug": "lionel-messi",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "ballon_dor_winner",
      "champions_league_winner",
      "world_cup_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "7a1b7cca-949d-5479-be4b-b97974b3f651",
  "name": "Kylian Mbappé",
  "slug": "kylian-mbappe",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": true,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "world_cup_winner",
      "young_breakthrough"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "bf6c4956-e65a-562d-913b-2fb1a53c2c4c",
  "name": "Neymar",
  "slug": "neymar",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "brazil",
    "nationalities": [
      "brazil"
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
      "brazil",
      "spain",
      "france"
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
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "champions_league_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "afd32e36-f7f9-562e-9b34-5d6d7198c6c4",
  "name": "Erling Haaland",
  "slug": "erling-haaland",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "united_kingdom",
    "nationalities": [
      "united_kingdom"
    ],
    "primaryLanguage": "english",
    "publicArea": "sports",
    "primaryProfession": "footballer",
    "professions": [
      "footballer",
      "athlete"
    ],
    "becameFamousPeriod": "2010_2019",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "norway",
      "united_kingdom",
      "germany"
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "champions_league_winner",
      "young_breakthrough"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "9820f04b-ed3e-5800-b57f-051909157b07",
  "name": "Mohamed Salah",
  "slug": "mohamed-salah",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "other",
    "nationalities": [
      "other"
    ],
    "primaryLanguage": "arabic",
    "publicArea": "sports",
    "primaryProfession": "footballer",
    "professions": [
      "footballer",
      "athlete"
    ],
    "becameFamousPeriod": "2010_2019",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_kingdom",
      "italy",
      "other"
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "champions_league_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "95d65b6b-d656-534b-8dfb-18a86a86cf7a",
  "name": "Serena Williams",
  "slug": "serena-williams",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
    "birthCountry": "united_states",
    "nationalities": [
      "united_states"
    ],
    "primaryLanguage": "english",
    "publicArea": "sports",
    "primaryProfession": "athlete",
    "professions": [
      "athlete"
    ],
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_states"
    ],
    "hasActedInFilmOrTelevision": false,
    "hasReleasedMusic": false,
    "hasPresentedTelevision": false,
    "createsOnlineContent": false,
    "hasPublishedBooks": false,
    "sport": "tennis",
    "representedNationalTeam": true,
    "heldPoliticalOffice": false,
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": true,
    "wonWorldChampionship": true,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grand_slam_winner",
      "olympic_champion"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "8361f1c0-1e30-5b68-99eb-d86f20da8c9b",
  "name": "LeBron James",
  "slug": "lebron-james",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "united_states",
    "nationalities": [
      "united_states"
    ],
    "primaryLanguage": "english",
    "publicArea": "sports",
    "primaryProfession": "athlete",
    "professions": [
      "athlete"
    ],
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_states"
    ],
    "hasActedInFilmOrTelevision": false,
    "hasReleasedMusic": false,
    "hasPresentedTelevision": false,
    "createsOnlineContent": false,
    "hasPublishedBooks": false,
    "sport": "basketball",
    "representedNationalTeam": true,
    "heldPoliticalOffice": false,
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": true,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "olympic_champion"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "aa191e48-1b2f-5f7b-a0f4-575a977ff805",
  "name": "Lewis Hamilton",
  "slug": "lewis-hamilton",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "united_kingdom",
    "nationalities": [
      "united_kingdom"
    ],
    "primaryLanguage": "english",
    "publicArea": "sports",
    "primaryProfession": "athlete",
    "professions": [
      "athlete"
    ],
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_kingdom",
      "monaco"
    ],
    "hasActedInFilmOrTelevision": false,
    "hasReleasedMusic": false,
    "hasPresentedTelevision": false,
    "createsOnlineContent": false,
    "hasPublishedBooks": false,
    "sport": "formula_one",
    "representedNationalTeam": true,
    "heldPoliticalOffice": false,
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": true,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "formula_one_champion"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "d7458e88-4d4a-544c-bff0-c3f153f64ce1",
  "name": "Simone Biles",
  "slug": "simone-biles",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
    "birthCountry": "united_states",
    "nationalities": [
      "united_states"
    ],
    "primaryLanguage": "english",
    "publicArea": "sports",
    "primaryProfession": "athlete",
    "professions": [
      "athlete"
    ],
    "becameFamousPeriod": "2010_2019",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_states"
    ],
    "hasActedInFilmOrTelevision": false,
    "hasReleasedMusic": false,
    "hasPresentedTelevision": false,
    "createsOnlineContent": false,
    "hasPublishedBooks": false,
    "sport": "gymnastics",
    "representedNationalTeam": true,
    "heldPoliticalOffice": false,
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": true,
    "wonWorldChampionship": true,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "olympic_champion"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "d90a69c3-7035-596e-afaa-3d8d8b78b6d5",
  "name": "Taylor Swift",
  "slug": "taylor-swift",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
      "singer"
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "acfc33fc-c992-58fa-83fb-bc189f997bff",
  "name": "Adele",
  "slug": "adele",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
      "singer"
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "87ec00a7-cf8c-5af0-8512-97a02a61d3cf",
  "name": "Beyoncé",
  "slug": "beyonce",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
      "singer"
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist",
      "band_member"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "23d4a7f4-9ba6-5f5f-86c2-62ad602c0372",
  "name": "Rihanna",
  "slug": "rihanna",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
    "birthCountry": "barbados",
    "nationalities": [
      "barbados"
    ],
    "primaryLanguage": "english",
    "publicArea": "music",
    "primaryProfession": "singer",
    "professions": [
      "singer"
    ],
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "barbados",
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "e2a1606e-3a1d-51f1-90c3-548ce748de7c",
  "name": "Billie Eilish",
  "slug": "billie-eilish",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
      "singer"
    ],
    "becameFamousPeriod": "2010_2019",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist",
      "young_breakthrough"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "ab5d38f1-7a7c-5104-91b0-306b2bfc044d",
  "name": "Ed Sheeran",
  "slug": "ed-sheeran",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "united_kingdom",
    "nationalities": [
      "united_kingdom"
    ],
    "primaryLanguage": "english",
    "publicArea": "music",
    "primaryProfession": "singer",
    "professions": [
      "singer"
    ],
    "becameFamousPeriod": "2010_2019",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_kingdom"
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "e96bc565-f26c-5185-a4f7-888edc090dad",
  "name": "Drake",
  "slug": "drake",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "canada",
    "nationalities": [
      "canada"
    ],
    "primaryLanguage": "english",
    "publicArea": "music",
    "primaryProfession": "singer",
    "professions": [
      "singer"
    ],
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "canada",
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "hip_hop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "a03f07eb-2d5a-5e2e-872a-70feff4c3726",
  "name": "Lady Gaga",
  "slug": "lady-gaga",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
      "singer"
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist",
      "academy_award_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "331eeee9-8c89-5868-b02e-2d46e3ac90db",
  "name": "Shakira",
  "slug": "shakira",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
    "birthCountry": "colombia",
    "nationalities": [
      "colombia"
    ],
    "primaryLanguage": "spanish",
    "publicArea": "music",
    "primaryProfession": "singer",
    "professions": [
      "singer"
    ],
    "becameFamousPeriod": "1980_1999",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "colombia",
      "spain",
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "pop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "2e04320f-6be3-56d3-b4f1-9ff40d8d9732",
  "name": "Bad Bunny",
  "slug": "bad-bunny",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "united_states",
    "nationalities": [
      "united_states"
    ],
    "primaryLanguage": "spanish",
    "publicArea": "music",
    "primaryProfession": "singer",
    "professions": [
      "singer"
    ],
    "becameFamousPeriod": "2010_2019",
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "grammy_winner",
      "hip_hop_artist",
      "solo_artist"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "da5cb1ee-62b0-5b42-8fa5-b5809c024780",
  "name": "Leonardo DiCaprio",
  "slug": "leonardo-dicaprio",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "academy_award_winner",
        "titanic_actor"
      ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "95f83396-6ea6-5d64-bacb-20112246a451",
  "name": "Tom Cruise",
  "slug": "tom-cruise",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "action_actor"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "05f667b5-2f5a-5cc3-8dfd-566ed97933a9",
  "name": "Brad Pitt",
  "slug": "brad-pitt",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "academy_award_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "2360a7a1-cc1e-500e-8ca8-7745cfb3f488",
  "name": "Robert Downey Jr.",
  "slug": "robert-downey-jr",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "academy_award_winner",
      "marvel_actor",
      "superhero_actor"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "4033de19-74e6-5f66-9468-7108e0de266c",
  "name": "Scarlett Johansson",
  "slug": "scarlett-johansson",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
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
    "becameFamousPeriod": "2000_2009",
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "marvel_actor",
      "superhero_actor"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "63c29f00-380d-5c98-b11f-302e9af38c96",
  "name": "Zendaya",
  "slug": "zendaya",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
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
    "becameFamousPeriod": "2010_2019",
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
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "young_breakthrough"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "c77e36af-3fba-5aeb-81d4-3f5b3f726cba",
  "name": "Jennifer Lawrence",
  "slug": "jennifer-lawrence",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
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
    "becameFamousPeriod": "2010_2019",
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "academy_award_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "f2d20209-e924-5fc5-815e-4195f9214bf7",
  "name": "Dwayne Johnson",
  "slug": "dwayne-johnson",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_states"
    ],
    "hasActedInFilmOrTelevision": true,
    "hasReleasedMusic": false,
    "hasPresentedTelevision": false,
    "createsOnlineContent": false,
    "hasPublishedBooks": false,
    "sport": "other",
    "representedNationalTeam": false,
    "heldPoliticalOffice": false,
    "foundedOrLedMajorCompany": false,
    "workedInScienceOrAcademia": false,
    "wonMajorInternationalAward": true,
    "wonOlympicMedal": false,
    "wonWorldChampionship": false,
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "action_actor"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "c00d283b-992d-51de-8d71-358200a8def4",
  "name": "Keanu Reeves",
  "slug": "keanu-reeves",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "male",
    "birthCountry": "other",
    "nationalities": [
      "other"
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
      "canada",
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "action_actor"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "cecb1041-0b9f-5581-8404-bea2e8398a5c",
  "name": "Emma Watson",
  "slug": "emma-watson",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": true,
    "gender": "female",
    "birthCountry": "france",
    "nationalities": [
      "france"
    ],
    "primaryLanguage": "english",
    "publicArea": "acting",
    "primaryProfession": "actor",
    "professions": [
      "actor"
    ],
    "becameFamousPeriod": "2000_2009",
    "primarilyKnownInternationally": true,
    "associatedCountries": [
      "united_kingdom",
      "france"
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "young_breakthrough"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "2f601a49-a968-519d-873d-d16fb988cd35",
  "name": "Albert Einstein",
  "slug": "albert-einstein",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": false,
    "gender": "male",
    "birthCountry": "germany",
    "nationalities": [
      "germany"
    ],
    "primaryLanguage": "german",
    "publicArea": "science",
    "primaryProfession": "scientist",
    "professions": [
      "scientist"
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "nobel_prize_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "8c1f02a4-f19f-5e95-ba4d-78dec36443fb",
  "name": "Marie Curie",
  "slug": "marie-curie",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
  "attributes": {
    "alive": false,
    "gender": "female",
    "birthCountry": "poland",
    "nationalities": [
      "poland"
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
      "poland",
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "nobel_prize_winner"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "1ee509ce-42bb-5d9f-bd8a-8295650389e5",
  "name": "J. K. Rowling",
  "slug": "j-k-rowling",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "fantasy_writer",
      "book_adapted_to_screen"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
},
{
  "id": "84b3c2c2-f5f9-5bca-9d9e-af6a0acfafb2",
  "name": "Stephen King",
  "slug": "stephen-king",
  "category": "famous_person",
  "status": "production",
  "schemaVersion": 1,
  "aliases": [],
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
    "hasGuinnessRecognizedRecord": null,
    "tags": [
      "horror_writer",
      "book_adapted_to_screen"
    ]
  },
  "createdAt": "2026-11-03T18:00:00.000Z",
  "updatedAt": "2026-11-03T18:00:00.000Z"
}
] as const;

export const ADDITIONAL_PERSON_DEFAULTS: PersonAttributes = {
  alive: true,
  gender: null,
  birthCountry: null,
  nationalities: ["other"],
  primaryLanguage: "other",
  publicArea: "other",
  primaryProfession: "other",
  professions: ["other"],
  becameFamousPeriod: "2000_2009",
  primarilyKnownInternationally: true,
  associatedCountries: ["other"],
  hasActedInFilmOrTelevision: false,
  hasReleasedMusic: false,
  hasPresentedTelevision: false,
  createsOnlineContent: false,
  hasPublishedBooks: false,
  sport: null,
  representedNationalTeam: false,
  heldPoliticalOffice: false,
  foundedOrLedMajorCompany: false,
  workedInScienceOrAcademia: false,
  wonMajorInternationalAward: false,
  wonOlympicMedal: false,
  wonWorldChampionship: false,
  hasGuinnessRecognizedRecord: null,
  tags: [],
};

function createAdditionalPerson(input: {
  id: string;
  name: string;
  slug: string;
  attributes: Partial<PersonAttributes>;
}) {
  return {
    id: input.id,
    name: input.name,
    slug: input.slug,
    category: "famous_person" as const,
    status: "production" as const,
    schemaVersion: 1 as const,
    aliases: [],
    attributes: {
      ...ADDITIONAL_PERSON_DEFAULTS,
      ...input.attributes,
    },
    createdAt: "2026-11-12T00:00:00.000Z",
    updatedAt: "2026-11-12T00:00:00.000Z",
  };
}

const ADDITIONAL_PEOPLE = [
  createAdditionalPerson({
    id: "d3f0b5b7-4e74-5afc-b2b4-9f2b1f6b6e01",
    name: "Michael Jordan",
    slug: "michael-jordan",
    attributes: {
      gender: "male",
      birthCountry: "united_states",
      nationalities: ["united_states"],
      primaryLanguage: "english",
      publicArea: "sports",
      primaryProfession: "athlete",
      professions: ["athlete"],
      becameFamousPeriod: "1980_1999",
      associatedCountries: ["united_states"],
      sport: "basketball",
      representedNationalTeam: true,
      wonMajorInternationalAward: true,
      wonOlympicMedal: true,
      wonWorldChampionship: true,
    },
  }),
  createAdditionalPerson({
    id: "4f4ce1e2-6880-5d19-8f4e-6b3be5b9e002",
    name: "Usain Bolt",
    slug: "usain-bolt",
    attributes: {
      gender: "male",
      birthCountry: "jamaica",
      nationalities: ["jamaica"],
      primaryLanguage: "english",
      publicArea: "sports",
      primaryProfession: "athlete",
      professions: ["athlete"],
      becameFamousPeriod: "2000_2009",
      associatedCountries: ["jamaica", "united_kingdom"],
      sport: "athletics",
      representedNationalTeam: true,
      wonMajorInternationalAward: true,
      wonOlympicMedal: true,
      wonWorldChampionship: true,
      tags: ["olympic_champion"],
    },
  }),
  createAdditionalPerson({
    id: "c1bafc34-6eb5-5f6e-9f7a-7b6f87f7e003",
    name: "Shah Rukh Khan",
    slug: "shah-rukh-khan",
    attributes: {
      gender: "male",
      birthCountry: "india",
      nationalities: ["india"],
      primaryLanguage: "hindi",
      publicArea: "acting",
      primaryProfession: "actor",
      professions: ["actor"],
      becameFamousPeriod: "1980_1999",
      associatedCountries: ["india"],
      hasActedInFilmOrTelevision: true,
      wonMajorInternationalAward: true,
      tags: ["action_actor"],
    },
  }),
  createAdditionalPerson({
    id: "f6b9b93d-3b39-50ee-ae41-9b8c2f6c2004",
    name: "Nelson Mandela",
    slug: "nelson-mandela",
    attributes: {
      alive: false,
      gender: "male",
      birthCountry: "south_africa",
      nationalities: ["south_africa"],
      primaryLanguage: "other",
      publicArea: "politics",
      primaryProfession: "politician",
      professions: ["politician", "writer"],
      becameFamousPeriod: "1950_1979",
      associatedCountries: ["south_africa"],
      hasPublishedBooks: true,
      heldPoliticalOffice: true,
      wonMajorInternationalAward: true,
    },
  }),
  createAdditionalPerson({
    id: "88e2b9cb-7a8a-5ec8-bf3d-1c9a7e9d5005",
    name: "Hayao Miyazaki",
    slug: "hayao-miyazaki",
    attributes: {
      gender: "male",
      birthCountry: "japan",
      nationalities: ["japan"],
      primaryLanguage: "japanese",
      publicArea: "acting",
      primaryProfession: "director",
      professions: ["director", "writer"],
      becameFamousPeriod: "1980_1999",
      associatedCountries: ["japan"],
      hasPublishedBooks: true,
      wonMajorInternationalAward: true,
      tags: ["film_director", "fantasy_writer"],
    },
  }),
  createAdditionalPerson({
    id: "a7d2c9e6-9e40-5f4b-8a11-2c3d6e7f6006",
    name: "Priyanka Chopra Jonas",
    slug: "priyanka-chopra-jonas",
    attributes: {
      gender: "female",
      birthCountry: "india",
      nationalities: ["india"],
      primaryLanguage: "hindi",
      publicArea: "acting",
      primaryProfession: "actor",
      professions: ["actor", "singer"],
      becameFamousPeriod: "2000_2009",
      associatedCountries: ["india", "united_states"],
      hasActedInFilmOrTelevision: true,
      hasReleasedMusic: true,
      wonMajorInternationalAward: true,
    },
  }),
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
    "id": "birth-continent-north-america",
    "source": "derived",
    "attribute": "birthContinent",
    "operator": "equals",
    "expectedValue": "north_america",
    "canonicalText": "Esta pessoa nasceu na América do Norte?",
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
    "canonicalText": "Esta pessoa é conhecida principalmente pelo desporto?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-music",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "music",
    "canonicalText": "Esta pessoa é conhecida principalmente pela música?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-acting",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "acting",
    "canonicalText": "Esta pessoa é conhecida principalmente por trabalhar como atriz ou ator?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-science",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "science",
    "canonicalText": "Esta pessoa é conhecida principalmente pelo trabalho em ciência?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "public-area-literature",
    "source": "stored",
    "attribute": "publicArea",
    "operator": "equals",
    "expectedValue": "literature",
    "canonicalText": "Esta pessoa é conhecida principalmente pelos livros que escreveu?",
    "exclusiveGroup": "primaryPublicArea"
  },
  {
    "id": "sport-football",
    "source": "stored",
    "attribute": "sport",
    "operator": "equals",
    "expectedValue": "football",
    "canonicalText": "Esta pessoa jogou futebol profissionalmente?",
    "exclusiveGroup": "sport"
  },
  {
    "id": "sport-tennis",
    "source": "stored",
    "attribute": "sport",
    "operator": "equals",
    "expectedValue": "tennis",
    "canonicalText": "Esta pessoa jogou ténis profissionalmente?",
    "exclusiveGroup": "sport"
  },
  {
    "id": "sport-basketball",
    "source": "stored",
    "attribute": "sport",
    "operator": "equals",
    "expectedValue": "basketball",
    "canonicalText": "Esta pessoa jogou basquetebol profissionalmente?",
    "exclusiveGroup": "sport"
  },
  {
    "id": "sport-formula-one",
    "source": "stored",
    "attribute": "sport",
    "operator": "equals",
    "expectedValue": "formula_one",
    "canonicalText": "Esta pessoa competiu na Fórmula 1?",
    "exclusiveGroup": "sport"
  },
  {
    "id": "sport-gymnastics",
    "source": "stored",
    "attribute": "sport",
    "operator": "equals",
    "expectedValue": "gymnastics",
    "canonicalText": "Esta pessoa ficou conhecida pela ginástica?",
    "exclusiveGroup": "sport"
  },
  {
    "id": "tag-ballon-dor-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "ballon_dor_winner",
    "canonicalText": "Esta pessoa ganhou a Bola de Ouro?"
  },
  {
    "id": "tag-champions-league-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "champions_league_winner",
    "canonicalText": "Esta pessoa ganhou a Liga dos Campeões?"
  },
  {
    "id": "tag-world-cup-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "world_cup_winner",
    "canonicalText": "Esta pessoa ganhou um Mundial de futebol?"
  },
  {
    "id": "tag-olympic-champion",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "olympic_champion",
    "canonicalText": "Esta pessoa foi campeã ou campeão olímpico?"
  },
  {
    "id": "tag-grand-slam-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "grand_slam_winner",
    "canonicalText": "Esta pessoa ganhou torneios Grand Slam?"
  },
  {
    "id": "tag-formula-one-champion",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "formula_one_champion",
    "canonicalText": "Esta pessoa foi campeã ou campeão mundial de Fórmula 1?"
  },
  {
    "id": "tag-grammy-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "grammy_winner",
    "canonicalText": "Esta pessoa ganhou um Grammy?"
  },
  {
    "id": "tag-pop-artist",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "pop_artist",
    "canonicalText": "Esta pessoa é conhecida sobretudo por música pop?"
  },
  {
    "id": "tag-hip-hop-artist",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "hip_hop_artist",
    "canonicalText": "Esta pessoa é conhecida sobretudo por rap ou hip-hop?"
  },
  {
    "id": "tag-band-member",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "band_member",
    "canonicalText": "Esta pessoa fez parte de um grupo musical conhecido?"
  },
  {
    "id": "tag-academy-award-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "academy_award_winner",
    "canonicalText": "Esta pessoa ganhou um Óscar?"
  },
  {
    "id": "tag-action-actor",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "action_actor",
    "canonicalText": "Esta pessoa é especialmente conhecida por filmes de ação?"
  },
  {
    "id": "tag-marvel-actor",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "marvel_actor",
    "canonicalText": "Esta pessoa interpretou uma personagem importante da Marvel?"
  },
  {
    "id": "tag-young-breakthrough",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "young_breakthrough",
    "canonicalText": "Esta pessoa ficou mundialmente conhecida ainda jovem?"
  },
  {
    "id": "tag-nobel-prize-winner",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "nobel_prize_winner",
    "canonicalText": "Esta pessoa recebeu um Prémio Nobel?"
  },
  {
    "id": "tag-fantasy-writer",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "fantasy_writer",
    "canonicalText": "Esta pessoa é conhecida por livros de fantasia?"
  },
  {
    "id": "tag-horror-writer",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "horror_writer",
    "canonicalText": "Esta pessoa é conhecida por livros de terror?"
  },
  {
    "id": "tag-book-adapted-to-screen",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "book_adapted_to_screen",
    "canonicalText": "Esta pessoa teve livros adaptados para cinema ou televisão?"
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
    "id": "birth-country-united-kingdom",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "united_kingdom",
    "canonicalText": "Esta pessoa nasceu no Reino Unido?",
    "exclusiveGroup": "birthCountry"
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
    "id": "birth-country-brazil",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "brazil",
    "canonicalText": "Esta pessoa nasceu no Brasil?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-canada",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "canada",
    "canonicalText": "Esta pessoa nasceu no Canadá?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-colombia",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "colombia",
    "canonicalText": "Esta pessoa nasceu na Colômbia?",
    "exclusiveGroup": "birthCountry"
  },
  {
    "id": "birth-country-poland",
    "source": "stored",
    "attribute": "birthCountry",
    "operator": "equals",
    "expectedValue": "poland",
    "canonicalText": "Esta pessoa nasceu na Polónia?",
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
    "id": "famous-before-1900",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "before_1900",
    "canonicalText": "Esta pessoa tornou-se mundialmente conhecida antes de 1900?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-1900-1949",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "1900_1949",
    "canonicalText": "Esta pessoa tornou-se mundialmente conhecida entre 1900 e 1949?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-1950-1979",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "1950_1979",
    "canonicalText": "Esta pessoa tornou-se mundialmente conhecida entre 1950 e 1979?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-1980-1999",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "1980_1999",
    "canonicalText": "Esta pessoa tornou-se mundialmente conhecida nos anos 80 ou 90?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-2000-2009",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "2000_2009",
    "canonicalText": "Esta pessoa tornou-se mundialmente conhecida nos anos 2000?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "famous-2010-2019",
    "source": "stored",
    "attribute": "becameFamousPeriod",
    "operator": "equals",
    "expectedValue": "2010_2019",
    "canonicalText": "Esta pessoa tornou-se mundialmente conhecida nos anos 2010?",
    "exclusiveGroup": "becameFamousPeriod"
  },
  {
    "id": "acted-film-tv",
    "source": "stored",
    "attribute": "hasActedInFilmOrTelevision",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa participou em filmes ou séries como atriz ou ator?"
  },
  {
    "id": "released-music",
    "source": "stored",
    "attribute": "hasReleasedMusic",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa lançou música profissionalmente?"
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
    "id": "female",
    "source": "stored",
    "attribute": "gender",
    "operator": "equals",
    "expectedValue": "female",
    "canonicalText": "Esta pessoa é uma mulher?"
  }
  ,
  {
    "id": "guinness-record",
    "source": "stored",
    "attribute": "hasGuinnessRecognizedRecord",
    "operator": "equals",
    "expectedValue": true,
    "canonicalText": "Esta pessoa tem um recorde reconhecido pelo Guinness World Records?"
  },
  {
    "id": "tag-titanic-actor",
    "source": "stored",
    "attribute": "tags",
    "operator": "contains",
    "expectedValue": "titanic_actor",
    "canonicalText": "Esta pessoa participou no filme Titanic?"
  }
] as const;
export const people = [...RAW_PEOPLE, ...ADDITIONAL_PEOPLE].map((person) =>
  FamousPersonSchema.parse(person),
);
export type GamePerson = (typeof people)[number];
export type GameQuestion = (typeof questions)[number];
