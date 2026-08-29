import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const userRoleEnum = pgEnum("user_role", ["CUSTOMER", "ADMIN"]);
export const contentStatusEnum = pgEnum("content_status", ["DRAFT", "REVIEW_REQUIRED", "PUBLISHED", "ARCHIVED"]);
export const generationKindEnum = pgEnum("generation_kind", ["PREVIEW", "HD"]);
export const generationStatusEnum = pgEnum("generation_status", [
  "DRAFT", "BLUEPRINT_CONFIRMED", "PROMPT_READY", "QUEUED", "GENERATING", "QA_PENDING",
  "REVIEW_REQUIRED", "PREVIEW_READY", "FAILED", "TIMED_OUT", "HD_QUEUED", "HD_READY", "DELIVERED",
]);
export const attemptStatusEnum = pgEnum("generation_attempt_status", ["QUEUED", "RUNNING", "SUCCEEDED", "FAILED", "TIMED_OUT", "CANCELLED"]);
export const paymentStatusEnum = pgEnum("payment_status", ["PENDING", "APPROVED", "FAILED", "CANCELLED", "REFUNDED"]);
export const orderStatusEnum = pgEnum("order_status", ["DRAFT", "PENDING_PAYMENT", "PAID", "FULFILLED", "CANCELLED", "REFUNDED"]);
export const qaReviewTypeEnum = pgEnum("qa_review_type", ["AUTOMATED", "MANUAL"]);
export const qaRatingEnum = pgEnum("qa_rating", ["EXCELLENT", "GOOD", "ACCEPTABLE", "REJECT"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  externalId: text("external_id").notNull(),
  email: text("email"),
  locale: text("locale").default("th").notNull(),
  version: integer("version").default(1).notNull(),
  active: boolean("active").default(true).notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("users_external_id_uq").on(table.externalId)]);

export const userRoles = pgTable("user_roles", {
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [primaryKey({ columns: [table.userId, table.role] })]);

export const packages = pgTable("packages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull(),
  localizedName: jsonb("localized_name").$type<Record<string, string>>().notNull(),
  localizedBenefits: jsonb("localized_benefits").$type<Record<string, string[]>>().notNull(),
  outputsSnapshot: jsonb("outputs_snapshot").$type<Record<string, unknown>>().notNull(),
  currency: text("currency").notNull(),
  amountMinor: integer("amount_minor").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  version: integer("version").default(1).notNull(),
  ...timestamps,
}, (table) => [
  uniqueIndex("packages_slug_uq").on(table.slug),
  index("packages_active_order_idx").on(table.active, table.displayOrder),
  check("packages_amount_nonnegative", sql`${table.amountMinor} >= 0`),
]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  packageId: uuid("package_id").references(() => packages.id).notNull(),
  artworkId: uuid("artwork_id"),
  packageSnapshot: jsonb("package_snapshot").$type<Record<string, unknown>>().notNull(),
  currency: text("currency").notNull(),
  amountMinor: integer("amount_minor").notNull(),
  status: orderStatusEnum("status").default("DRAFT").notNull(),
  paymentProvider: text("payment_provider").notNull(),
  paymentReference: text("payment_reference"),
  idempotencyKey: text("idempotency_key").notNull(),
  version: integer("version").default(1).notNull(),
  ...timestamps,
}, (table) => [
  uniqueIndex("orders_user_idempotency_uq").on(table.userId, table.idempotencyKey),
  index("orders_user_created_idx").on(table.userId, table.createdAt),
]);

export const orderEvents = pgTable("order_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  fromStatus: orderStatusEnum("from_status"),
  toStatus: orderStatusEnum("to_status").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("order_events_order_created_idx").on(table.orderId, table.createdAt)]);

export const paymentAttempts = pgTable("payment_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  provider: text("provider").notNull(),
  providerPaymentId: text("provider_payment_id"),
  idempotencyKey: text("idempotency_key").notNull(),
  status: paymentStatusEnum("status").default("PENDING").notNull(),
  requestSnapshot: jsonb("request_snapshot").$type<Record<string, unknown>>().notNull(),
  responseSnapshot: jsonb("response_snapshot").$type<Record<string, unknown>>(),
  ...timestamps,
}, (table) => [
  uniqueIndex("payment_attempts_provider_idempotency_uq").on(table.provider, table.idempotencyKey),
  index("payment_attempts_order_idx").on(table.orderId),
]);

export const artworkRequests = pgTable("artwork_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  selections: jsonb("selections").$type<Record<string, unknown>>().default({}).notNull(),
  hasStory: boolean("has_story").default(false).notNull(),
  draftStage: text("draft_stage").notNull(),
  status: text("status").default("DRAFT").notNull(),
  schemaVersion: text("schema_version").notNull(),
  version: integer("version").default(1).notNull(),
  ...timestamps,
}, (table) => [index("artwork_requests_user_updated_idx").on(table.userId, table.updatedAt)]);

export const storyInterpretations = pgTable("story_interpretations", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id").references(() => artworkRequests.id, { onDelete: "cascade" }).notNull(),
  structuredSnapshot: jsonb("structured_snapshot").$type<Record<string, unknown>>().notNull(),
  interpreterVersion: text("interpreter_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("story_interpretations_request_idx").on(table.requestId)]);

export const catalogVersions = pgTable("catalog_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  version: text("version").notNull(),
  snapshot: jsonb("snapshot").$type<Record<string, unknown>>().notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("catalog_versions_version_uq").on(table.version)]);

function catalogTable(name: string) {
  return pgTable(name, {
    id: uuid("id").defaultRandom().primaryKey(),
    stableKey: text("stable_key").notNull(),
    content: jsonb("content").$type<Record<string, unknown>>().notNull(),
    status: contentStatusEnum("status").default("DRAFT").notNull(),
    active: boolean("active").default(false).notNull(),
    version: integer("version").default(1).notNull(),
    ...timestamps,
  }, (table) => [uniqueIndex(`${name}_stable_key_uq`).on(table.stableKey), index(`${name}_status_active_idx`).on(table.status, table.active)]);
}

export const artWorlds = catalogTable("art_worlds");
export const archetypes = catalogTable("archetypes");
export const symbols = catalogTable("symbols");
export const palettes = catalogTable("palettes");
export const compositions = catalogTable("compositions");
export const visualMetaphors = catalogTable("visual_metaphors");

export const culturalReviews = pgTable("cultural_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id").notNull(),
  confidence: text("confidence").notNull(),
  status: contentStatusEnum("status").default("REVIEW_REQUIRED").notNull(),
  reviewerId: uuid("reviewer_id").references(() => users.id),
  sourceNote: text("source_note"),
  evidenceSnapshot: jsonb("evidence_snapshot").$type<Record<string, unknown>>().default({}).notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [index("cultural_reviews_entity_idx").on(table.entityType, table.entityId)]);

export const artworkBlueprints = pgTable("artwork_blueprints", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id").references(() => artworkRequests.id, { onDelete: "cascade" }).notNull(),
  revision: integer("revision").notNull(),
  title: text("title").notNull(),
  narrative: text("narrative").notNull(),
  blueprintSnapshot: jsonb("blueprint_snapshot").$type<Record<string, unknown>>().notNull(),
  decisionTrace: jsonb("decision_trace").$type<Record<string, unknown>>().notNull(),
  catalogVersions: jsonb("catalog_versions").$type<Record<string, string>>().notNull(),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("artwork_blueprints_request_revision_uq").on(table.requestId, table.revision),
  index("artwork_blueprints_request_idx").on(table.requestId),
]);

export const artworks = pgTable("artworks", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: uuid("owner_id").references(() => users.id).notNull(),
  blueprintId: uuid("blueprint_id").references(() => artworkBlueprints.id).notNull(),
  previewStatus: text("preview_status").notNull(),
  hdStatus: text("hd_status").notNull(),
  published: boolean("published").default(false).notNull(),
  version: integer("version").default(1).notNull(),
  ...timestamps,
}, (table) => [index("artworks_owner_created_idx").on(table.ownerId, table.createdAt)]);

export const artworkAssets = pgTable("artwork_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  artworkId: uuid("artwork_id").references(() => artworks.id, { onDelete: "cascade" }).notNull(),
  purpose: text("purpose").notNull(),
  format: text("format").notNull(),
  storageKey: text("storage_key").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  checksum: text("checksum").notNull(),
  visibility: text("visibility").default("PRIVATE").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("artwork_assets_storage_key_uq").on(table.storageKey), index("artwork_assets_artwork_idx").on(table.artworkId)]);

export const favorites = pgTable("favorites", {
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  artworkId: uuid("artwork_id").references(() => artworks.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [primaryKey({ columns: [table.userId, table.artworkId] })]);

export const promptVersions = pgTable("prompt_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  version: text("version").notNull(),
  masterDna: jsonb("master_dna").$type<Record<string, unknown>>().notNull(),
  qualityFragments: jsonb("quality_fragments").$type<string[]>().notNull(),
  negativeFragments: jsonb("negative_fragments").$type<string[]>().notNull(),
  status: contentStatusEnum("status").default("DRAFT").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("prompt_versions_version_uq").on(table.version)]);

export const compiledPrompts = pgTable("compiled_prompts", {
  id: uuid("id").defaultRandom().primaryKey(),
  blueprintId: uuid("blueprint_id").references(() => artworkBlueprints.id).notNull(),
  promptVersionId: uuid("prompt_version_id").references(() => promptVersions.id).notNull(),
  positivePrompt: text("positive_prompt").notNull(),
  negativePrompt: text("negative_prompt").notNull(),
  compilationHash: text("compilation_hash").notNull(),
  versionsSnapshot: jsonb("versions_snapshot").$type<Record<string, string>>().notNull(),
  guardResult: jsonb("guard_result").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("compiled_prompts_hash_uq").on(table.compilationHash), index("compiled_prompts_blueprint_idx").on(table.blueprintId)]);

export const generationJobs = pgTable("generation_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  artworkId: uuid("artwork_id").references(() => artworks.id),
  blueprintId: uuid("blueprint_id").references(() => artworkBlueprints.id).notNull(),
  compiledPromptId: uuid("compiled_prompt_id").references(() => compiledPrompts.id).notNull(),
  kind: generationKindEnum("kind").notNull(),
  status: generationStatusEnum("status").default("QUEUED").notNull(),
  requestHash: text("request_hash").notNull(),
  idempotencyKey: text("idempotency_key").notNull(),
  automaticRetryCount: integer("automatic_retry_count").default(0).notNull(),
  estimatedCostMinor: integer("estimated_cost_minor").default(0).notNull(),
  estimatedCostCurrency: text("estimated_cost_currency").default("USD").notNull(),
  timeoutAt: timestamp("timeout_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  version: integer("version").default(1).notNull(),
  ...timestamps,
}, (table) => [
  uniqueIndex("generation_jobs_idempotency_uq").on(table.idempotencyKey),
  index("generation_jobs_request_hash_status_idx").on(table.requestHash, table.status),
  index("generation_jobs_status_created_idx").on(table.status, table.createdAt),
  check("generation_jobs_retry_ceiling", sql`${table.automaticRetryCount} between 0 and 1`),
]);

export const generationAttempts = pgTable("generation_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => generationJobs.id, { onDelete: "cascade" }).notNull(),
  attemptNumber: integer("attempt_number").notNull(),
  status: attemptStatusEnum("status").default("QUEUED").notNull(),
  provider: text("provider").notNull(),
  model: text("model").notNull(),
  settingsSnapshot: jsonb("settings_snapshot").$type<Record<string, unknown>>().notNull(),
  providerGenerationId: text("provider_generation_id"),
  errorClass: text("error_class"),
  errorCode: text("error_code"),
  durationMs: integer("duration_ms"),
  estimatedCostMinor: integer("estimated_cost_minor").default(0).notNull(),
  actualCostMinor: integer("actual_cost_minor"),
  costCurrency: text("cost_currency").default("USD").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("generation_attempts_job_number_uq").on(table.jobId, table.attemptNumber),
  uniqueIndex("generation_attempts_one_active_uq")
    .on(table.jobId)
    .where(sql`${table.status} in ('QUEUED', 'RUNNING')`),
  index("generation_attempts_provider_generation_idx").on(table.provider, table.providerGenerationId),
  check("generation_attempt_number_range", sql`${table.attemptNumber} between 1 and 2`),
]);

export const generationEvents = pgTable("generation_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => generationJobs.id, { onDelete: "cascade" }).notNull(),
  fromStatus: generationStatusEnum("from_status"),
  toStatus: generationStatusEnum("to_status").notNull(),
  eventType: text("event_type").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("generation_events_job_created_idx").on(table.jobId, table.createdAt)]);

export const qaReviews = pgTable("qa_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => generationJobs.id, { onDelete: "cascade" }).notNull(),
  assetId: uuid("asset_id").references(() => artworkAssets.id),
  type: qaReviewTypeEnum("type").notNull(),
  score: integer("score"),
  dimensions: jsonb("dimensions").$type<Record<string, unknown>>().notNull(),
  failureTags: jsonb("failure_tags").$type<string[]>().default([]).notNull(),
  rating: qaRatingEnum("rating"),
  reviewerId: uuid("reviewer_id").references(() => users.id),
  simulated: boolean("simulated").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("qa_reviews_job_created_idx").on(table.jobId, table.createdAt), check("qa_score_range", sql`${table.score} is null or (${table.score} between 0 and 100)`)]);

export const settings = pgTable("settings", {
  namespace: text("namespace").notNull(),
  key: text("key").notNull(),
  value: jsonb("value").$type<unknown>().notNull(),
  valueType: text("value_type").notNull(),
  version: integer("version").default(1).notNull(),
  ...timestamps,
}, (table) => [primaryKey({ columns: [table.namespace, table.key] })]);

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventName: text("event_name").notNull(),
  userId: uuid("user_id").references(() => users.id),
  anonymousId: text("anonymous_id"),
  sessionId: text("session_id"),
  route: text("route"),
  properties: jsonb("properties").$type<Record<string, string | number | boolean | null>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("analytics_events_name_created_idx").on(table.eventName, table.createdAt)]);
