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