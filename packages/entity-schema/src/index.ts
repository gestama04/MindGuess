import { z } from "zod";

export const SCHEMA_VERSION = 1 as const;
export const EntityStatusSchema = z.enum(["pending", "production", "rejected"]);
export const EntityCategorySchema = z.literal("famous_person");
export const GenderSchema = z.enum(["male", "female", "non_binary", "other"]);
export const CountrySchema = z.enum([
  "argentina", "australia", "barbados", "belgium", "brazil", "canada",
  "colombia", "france", "germany", "india", "ireland", "italy", "jamaica",
  "japan", "monaco", "netherlands", "norway", "poland", "portugal",
  "south_africa", "south_korea", "spain", "sweden", "switzerland",
  "united_kingdom", "united_states", "other",
]);
export const ContinentSchema = z.enum(["africa", "asia", "europe", "north_america", "south_america", "oceania", "unknown"]);
export const PrimaryLanguageSchema = z.enum(["arabic", "chinese", "english", "french", "german", "hindi", "italian", "japanese", "korean", "portuguese", "russian", "spanish", "other"]);
export const PublicAreaSchema = z.enum(["acting", "business", "comedy", "internet", "journalism", "literature", "music", "politics", "science", "sports", "television", "other"]);
export const ProfessionSchema = z.enum(["actor", "athlete", "businessperson", "comedian", "content_creator", "director", "footballer", "journalist", "musician", "politician", "presenter", "scientist", "singer", "writer", "other"]);
export const BecameFamousPeriodSchema = z.enum(["before_1900", "1900_1949", "1950_1979", "1980_1999", "2000_2009", "2010_2019", "2020_present"]);
export const SportSchema = z.enum(["athletics", "basketball", "boxing", "cycling", "football", "formula_one", "golf", "gymnastics", "martial_arts", "motorsport", "rugby", "swimming", "tennis", "other"]);
export const PersonTagSchema = z.enum([
  "academy_award_winner", "action_actor", "ballon_dor_winner", "band_member",
  "champions_league_winner", "comedy_actor", "film_director", "formula_one_champion",
  "grammy_winner", "grand_slam_winner", "hip_hop_artist", "marvel_actor",
  "nobel_prize_winner", "olympic_champion", "pop_artist", "solo_artist",
  "superhero_actor", "world_cup_winner", "young_breakthrough",
  "fantasy_writer", "horror_writer", "book_adapted_to_screen", "titanic_actor",
]);
export const PersonAttributesSchema = z.object({
  alive: z.boolean().nullable(), gender: GenderSchema.nullable(), birthCountry: CountrySchema.nullable(),
  nationalities: z.array(CountrySchema).min(1), primaryLanguage: PrimaryLanguageSchema.nullable(),
  publicArea: PublicAreaSchema.nullable(), primaryProfession: ProfessionSchema.nullable(),
  professions: z.array(ProfessionSchema).min(1), becameFamousPeriod: BecameFamousPeriodSchema.nullable(),
  primarilyKnownInternationally: z.boolean().nullable(), associatedCountries: z.array(CountrySchema),
  hasActedInFilmOrTelevision: z.boolean().nullable(), hasReleasedMusic: z.boolean().nullable(),
  hasPresentedTelevision: z.boolean().nullable(), createsOnlineContent: z.boolean().nullable(),
  hasPublishedBooks: z.boolean().nullable(), sport: SportSchema.nullable(),
  representedNationalTeam: z.boolean().nullable(), heldPoliticalOffice: z.boolean().nullable(),
  foundedOrLedMajorCompany: z.boolean().nullable(), workedInScienceOrAcademia: z.boolean().nullable(),
  wonMajorInternationalAward: z.boolean().nullable(), wonOlympicMedal: z.boolean().nullable(),
  wonWorldChampionship: z.boolean().nullable(), hasGuinnessRecognizedRecord: z.boolean().nullable(),
  tags: z.array(PersonTagSchema).default([]),
}).strict();
export const FamousPersonSchema = z.object({
  id: z.string().uuid(), name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: EntityCategorySchema, status: EntityStatusSchema, schemaVersion: z.literal(SCHEMA_VERSION),
  aliases: z.array(z.string().trim().min(1).max(120)), attributes: PersonAttributesSchema,
  createdAt: z.iso.datetime(), updatedAt: z.iso.datetime(),
}).strict();
export type Country = z.infer<typeof CountrySchema>; export type Continent = z.infer<typeof ContinentSchema>;
export type Profession = z.infer<typeof ProfessionSchema>; export type PersonAttributes = z.infer<typeof PersonAttributesSchema>;
export type FamousPerson = z.infer<typeof FamousPersonSchema>;
const COUNTRY_CONTINENT: Record<Country, Continent> = {
  argentina:"south_america", australia:"oceania", barbados:"north_america", belgium:"europe", brazil:"south_america",
  canada:"north_america", colombia:"south_america", france:"europe", germany:"europe", india:"asia", ireland:"europe",
  italy:"europe", jamaica:"north_america", japan:"asia", monaco:"europe", netherlands:"europe", norway:"europe",
  poland:"europe", portugal:"europe", south_africa:"africa", south_korea:"asia", spain:"europe", sweden:"europe",
  switzerland:"europe", united_kingdom:"europe", united_states:"north_america", other:"unknown",
};
export function getBirthContinent(a: PersonAttributes): Continent | null { return a.birthCountry === null ? null : COUNTRY_CONTINENT[a.birthCountry]; }
export function hasProfession(a: PersonAttributes, p: Profession): boolean { return a.professions.includes(p); }
export function isAssociatedWith(a: PersonAttributes, c: Country): boolean { return a.associatedCountries.includes(c); }
export function isProfessionalAthlete(a: PersonAttributes): boolean { return a.sport !== null || hasProfession(a, "athlete"); }
export function isPolitician(a: PersonAttributes): boolean { return hasProfession(a, "politician") || a.heldPoliticalOffice === true; }
export function isScientist(a: PersonAttributes): boolean { return hasProfession(a, "scientist") || a.workedInScienceOrAcademia === true; }
export function validateFamousPerson(input: unknown): FamousPerson { return FamousPersonSchema.parse(input); }
export function safeValidateFamousPerson(input: unknown) { return FamousPersonSchema.safeParse(input); }
