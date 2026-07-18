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

export const ContinentSchema = z.enum([
  "africa",
  "asia",
  "europe",
  "north_america",
  "south_america",
  "oceania",
]);

export const PublicAreaSchema = z.enum([
  "entertainment",
  "sports",
  "politics",
  "science",
  "business",
  "literature",
  "internet",
  "religion",
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

export const ActivePeriodSchema = z.enum([
  "before_1900",
  "1900_1949",
  "1950_1979",
  "1980_1999",
  "2000_2009",
  "2010_2019",
  "2020_present",
]);

export const PersonAttributesSchema = z.object({
  alive: z.boolean().nullable(),
  gender: GenderSchema.nullable(),
  birthContinent: ContinentSchema.nullable(),
  nationalities: z.array(z.string().min(2)).min(1),
  primaryProfession: ProfessionSchema.nullable(),
  professions: z.array(ProfessionSchema).min(1),
  publicArea: PublicAreaSchema.nullable(),
  activePeriod: ActivePeriodSchema.nullable(),
  isActor: z.boolean().nullable(),
  isAthlete: z.boolean().nullable(),
  isBusinessperson: z.boolean().nullable(),
  isContentCreator: z.boolean().nullable(),
  isFootballer: z.boolean().nullable(),
  isMusician: z.boolean().nullable(),
  isPolitician: z.boolean().nullable(),
  isScientist: z.boolean().nullable(),
  isSinger: z.boolean().nullable(),
  isWriter: z.boolean().nullable(),
  hasWonMajorInternationalAward: z.boolean().nullable(),
  primarilyKnownInternationally: z.boolean().nullable(),
});

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
});

export type EntityStatus = z.infer<typeof EntityStatusSchema>;
export type EntityCategory = z.infer<typeof EntityCategorySchema>;
export type Gender = z.infer<typeof GenderSchema>;
export type Continent = z.infer<typeof ContinentSchema>;
export type PublicArea = z.infer<typeof PublicAreaSchema>;
export type Profession = z.infer<typeof ProfessionSchema>;
export type ActivePeriod = z.infer<typeof ActivePeriodSchema>;
export type PersonAttributes = z.infer<typeof PersonAttributesSchema>;
export type FamousPerson = z.infer<typeof FamousPersonSchema>;

export function validateFamousPerson(input: unknown): FamousPerson {
  return FamousPersonSchema.parse(input);
}

export function safeValidateFamousPerson(input: unknown) {
  return FamousPersonSchema.safeParse(input);
}
