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
