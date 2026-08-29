export const FUTURE_GIFT_CATEGORIES = [
  "NEW_HOME", "WEDDING", "ANNIVERSARY", "BIRTHDAY", "NEW_BUSINESS", "RETIREMENT", "FAMILY_LEGACY", "CHIANG_MAI_MEMORY", "PERSONAL_JOURNEY",
] as const;

export type FutureGiftCategory = (typeof FUTURE_GIFT_CATEGORIES)[number];

export type FutureGiftCategoryRecord = Readonly<{
  id: FutureGiftCategory;
  active: false;
  productBehavior: "DEFERRED";
}>;

export type ArtistCollectionRecord = Readonly<{
  id: string;
  artistId: string;
  active: false;
  reviewStatus: "DRAFT" | "REVIEW_REQUIRED";
  rightsStatus: "UNVERIFIED" | "CONTRACT_REQUIRED" | "CLEARED";
  referencePolicy: "NO_STYLE_IMITATION";
}>;

export const FUTURE_GIFT_CATEGORY_RECORDS: readonly FutureGiftCategoryRecord[] = Object.freeze(
  FUTURE_GIFT_CATEGORIES.map((id) => ({ id, active: false as const, productBehavior: "DEFERRED" as const })),
);
