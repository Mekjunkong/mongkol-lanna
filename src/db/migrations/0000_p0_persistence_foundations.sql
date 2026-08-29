CREATE TYPE "public"."generation_attempt_status" AS ENUM('QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'TIMED_OUT', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."content_status" AS ENUM('DRAFT', 'REVIEW_REQUIRED', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."generation_kind" AS ENUM('PREVIEW', 'HD');--> statement-breakpoint
CREATE TYPE "public"."generation_status" AS ENUM('DRAFT', 'BLUEPRINT_CONFIRMED', 'PROMPT_READY', 'QUEUED', 'GENERATING', 'QA_PENDING', 'REVIEW_REQUIRED', 'PREVIEW_READY', 'FAILED', 'TIMED_OUT', 'HD_QUEUED', 'HD_READY', 'DELIVERED');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('DRAFT', 'PENDING_PAYMENT', 'PAID', 'FULFILLED', 'CANCELLED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'APPROVED', 'FAILED', 'CANCELLED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."qa_rating" AS ENUM('EXCELLENT', 'GOOD', 'ACCEPTABLE', 'REJECT');--> statement-breakpoint
CREATE TYPE "public"."qa_review_type" AS ENUM('AUTOMATED', 'MANUAL');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('CUSTOMER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_name" text NOT NULL,
	"user_id" uuid,
	"anonymous_id" text,
	"session_id" text,
	"route" text,
	"properties" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "archetypes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "art_worlds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artwork_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"artwork_id" uuid NOT NULL,
	"purpose" text NOT NULL,
	"format" text NOT NULL,
	"storage_key" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"checksum" text NOT NULL,
	"visibility" text DEFAULT 'PRIVATE' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artwork_blueprints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"revision" integer NOT NULL,
	"title" text NOT NULL,
	"narrative" text NOT NULL,
	"blueprint_snapshot" jsonb NOT NULL,
	"decision_trace" jsonb NOT NULL,
	"catalog_versions" jsonb NOT NULL,
	"confirmed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artwork_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"selections" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"has_story" boolean DEFAULT false NOT NULL,
	"draft_stage" text NOT NULL,
	"status" text DEFAULT 'DRAFT' NOT NULL,
	"schema_version" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"blueprint_id" uuid NOT NULL,
	"preview_status" text NOT NULL,
	"hd_status" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catalog_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"snapshot" jsonb NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compiled_prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blueprint_id" uuid NOT NULL,
	"prompt_version_id" uuid NOT NULL,
	"positive_prompt" text NOT NULL,
	"negative_prompt" text NOT NULL,
	"compilation_hash" text NOT NULL,
	"versions_snapshot" jsonb NOT NULL,
	"guard_result" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compositions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cultural_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"confidence" text NOT NULL,
	"status" "content_status" DEFAULT 'REVIEW_REQUIRED' NOT NULL,
	"reviewer_id" uuid,
	"source_note" text,
	"evidence_snapshot" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"user_id" uuid NOT NULL,
	"artwork_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_user_id_artwork_id_pk" PRIMARY KEY("user_id","artwork_id")
);
--> statement-breakpoint
CREATE TABLE "generation_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"attempt_number" integer NOT NULL,
	"status" "generation_attempt_status" DEFAULT 'QUEUED' NOT NULL,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"settings_snapshot" jsonb NOT NULL,
	"provider_generation_id" text,
	"error_class" text,
	"error_code" text,
	"duration_ms" integer,
	"estimated_cost_minor" integer DEFAULT 0 NOT NULL,
	"actual_cost_minor" integer,
	"cost_currency" text DEFAULT 'USD' NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "generation_attempt_number_range" CHECK ("generation_attempts"."attempt_number" between 1 and 2)
);
--> statement-breakpoint
CREATE TABLE "generation_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"from_status" "generation_status",
	"to_status" "generation_status" NOT NULL,
	"event_type" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generation_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"artwork_id" uuid,
	"blueprint_id" uuid NOT NULL,
	"compiled_prompt_id" uuid NOT NULL,
	"kind" "generation_kind" NOT NULL,
	"status" "generation_status" DEFAULT 'QUEUED' NOT NULL,
	"request_hash" text NOT NULL,
	"idempotency_key" text NOT NULL,
	"automatic_retry_count" integer DEFAULT 0 NOT NULL,
	"estimated_cost_minor" integer DEFAULT 0 NOT NULL,
	"estimated_cost_currency" text DEFAULT 'USD' NOT NULL,
	"timeout_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "generation_jobs_retry_ceiling" CHECK ("generation_jobs"."automatic_retry_count" between 0 and 1)
);
--> statement-breakpoint
CREATE TABLE "order_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"from_status" "order_status",
	"to_status" "order_status" NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"package_id" uuid NOT NULL,
	"artwork_id" uuid,
	"package_snapshot" jsonb NOT NULL,
	"currency" text NOT NULL,
	"amount_minor" integer NOT NULL,
	"status" "order_status" DEFAULT 'DRAFT' NOT NULL,
	"payment_provider" text NOT NULL,
	"payment_reference" text,
	"idempotency_key" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"localized_name" jsonb NOT NULL,
	"localized_benefits" jsonb NOT NULL,
	"outputs_snapshot" jsonb NOT NULL,
	"currency" text NOT NULL,
	"amount_minor" integer NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "packages_amount_nonnegative" CHECK ("packages"."amount_minor" >= 0)
);
--> statement-breakpoint
CREATE TABLE "palettes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"provider" text NOT NULL,
	"provider_payment_id" text,
	"idempotency_key" text NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING' NOT NULL,
	"request_snapshot" jsonb NOT NULL,
	"response_snapshot" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"master_dna" jsonb NOT NULL,
	"quality_fragments" jsonb NOT NULL,
	"negative_fragments" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qa_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"asset_id" uuid,
	"type" "qa_review_type" NOT NULL,
	"score" integer,
	"dimensions" jsonb NOT NULL,
	"failure_tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rating" "qa_rating",
	"reviewer_id" uuid,
	"simulated" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "qa_score_range" CHECK ("qa_reviews"."score" is null or ("qa_reviews"."score" between 0 and 100))
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"namespace" text NOT NULL,
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"value_type" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "settings_namespace_key_pk" PRIMARY KEY("namespace","key")
);
--> statement-breakpoint
CREATE TABLE "story_interpretations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"structured_snapshot" jsonb NOT NULL,
	"interpreter_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "symbols" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"role" "user_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_user_id_role_pk" PRIMARY KEY("user_id","role")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text NOT NULL,
	"email" text,
	"locale" text DEFAULT 'th' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visual_metaphors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artwork_assets" ADD CONSTRAINT "artwork_assets_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "public"."artworks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artwork_blueprints" ADD CONSTRAINT "artwork_blueprints_request_id_artwork_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."artwork_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artwork_requests" ADD CONSTRAINT "artwork_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artworks" ADD CONSTRAINT "artworks_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artworks" ADD CONSTRAINT "artworks_blueprint_id_artwork_blueprints_id_fk" FOREIGN KEY ("blueprint_id") REFERENCES "public"."artwork_blueprints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compiled_prompts" ADD CONSTRAINT "compiled_prompts_blueprint_id_artwork_blueprints_id_fk" FOREIGN KEY ("blueprint_id") REFERENCES "public"."artwork_blueprints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compiled_prompts" ADD CONSTRAINT "compiled_prompts_prompt_version_id_prompt_versions_id_fk" FOREIGN KEY ("prompt_version_id") REFERENCES "public"."prompt_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cultural_reviews" ADD CONSTRAINT "cultural_reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "public"."artworks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_attempts" ADD CONSTRAINT "generation_attempts_job_id_generation_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."generation_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_events" ADD CONSTRAINT "generation_events_job_id_generation_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."generation_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_jobs" ADD CONSTRAINT "generation_jobs_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "public"."artworks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_jobs" ADD CONSTRAINT "generation_jobs_blueprint_id_artwork_blueprints_id_fk" FOREIGN KEY ("blueprint_id") REFERENCES "public"."artwork_blueprints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_jobs" ADD CONSTRAINT "generation_jobs_compiled_prompt_id_compiled_prompts_id_fk" FOREIGN KEY ("compiled_prompt_id") REFERENCES "public"."compiled_prompts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_events" ADD CONSTRAINT "order_events_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_attempts" ADD CONSTRAINT "payment_attempts_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa_reviews" ADD CONSTRAINT "qa_reviews_job_id_generation_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."generation_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa_reviews" ADD CONSTRAINT "qa_reviews_asset_id_artwork_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."artwork_assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa_reviews" ADD CONSTRAINT "qa_reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_interpretations" ADD CONSTRAINT "story_interpretations_request_id_artwork_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."artwork_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analytics_events_name_created_idx" ON "analytics_events" USING btree ("event_name","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "archetypes_stable_key_uq" ON "archetypes" USING btree ("stable_key");--> statement-breakpoint
CREATE INDEX "archetypes_status_active_idx" ON "archetypes" USING btree ("status","active");--> statement-breakpoint
CREATE UNIQUE INDEX "art_worlds_stable_key_uq" ON "art_worlds" USING btree ("stable_key");--> statement-breakpoint
CREATE INDEX "art_worlds_status_active_idx" ON "art_worlds" USING btree ("status","active");--> statement-breakpoint
CREATE UNIQUE INDEX "artwork_assets_storage_key_uq" ON "artwork_assets" USING btree ("storage_key");--> statement-breakpoint
CREATE INDEX "artwork_assets_artwork_idx" ON "artwork_assets" USING btree ("artwork_id");--> statement-breakpoint
CREATE UNIQUE INDEX "artwork_blueprints_request_revision_uq" ON "artwork_blueprints" USING btree ("request_id","revision");--> statement-breakpoint
CREATE INDEX "artwork_blueprints_request_idx" ON "artwork_blueprints" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "artwork_requests_user_updated_idx" ON "artwork_requests" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE INDEX "artworks_owner_created_idx" ON "artworks" USING btree ("owner_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "catalog_versions_version_uq" ON "catalog_versions" USING btree ("version");--> statement-breakpoint
CREATE UNIQUE INDEX "compiled_prompts_hash_uq" ON "compiled_prompts" USING btree ("compilation_hash");--> statement-breakpoint
CREATE INDEX "compiled_prompts_blueprint_idx" ON "compiled_prompts" USING btree ("blueprint_id");--> statement-breakpoint
CREATE UNIQUE INDEX "compositions_stable_key_uq" ON "compositions" USING btree ("stable_key");--> statement-breakpoint
CREATE INDEX "compositions_status_active_idx" ON "compositions" USING btree ("status","active");--> statement-breakpoint
CREATE INDEX "cultural_reviews_entity_idx" ON "cultural_reviews" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "generation_attempts_job_number_uq" ON "generation_attempts" USING btree ("job_id","attempt_number");--> statement-breakpoint
CREATE UNIQUE INDEX "generation_attempts_one_active_uq" ON "generation_attempts" USING btree ("job_id") WHERE "generation_attempts"."status" in ('QUEUED', 'RUNNING');--> statement-breakpoint
CREATE INDEX "generation_attempts_provider_generation_idx" ON "generation_attempts" USING btree ("provider","provider_generation_id");--> statement-breakpoint
CREATE INDEX "generation_events_job_created_idx" ON "generation_events" USING btree ("job_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "generation_jobs_idempotency_uq" ON "generation_jobs" USING btree ("idempotency_key");--> statement-breakpoint
CREATE INDEX "generation_jobs_request_hash_status_idx" ON "generation_jobs" USING btree ("request_hash","status");--> statement-breakpoint
CREATE INDEX "generation_jobs_status_created_idx" ON "generation_jobs" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "order_events_order_created_idx" ON "order_events" USING btree ("order_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_user_idempotency_uq" ON "orders" USING btree ("user_id","idempotency_key");--> statement-breakpoint
CREATE INDEX "orders_user_created_idx" ON "orders" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "packages_slug_uq" ON "packages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "packages_active_order_idx" ON "packages" USING btree ("active","display_order");--> statement-breakpoint
CREATE UNIQUE INDEX "palettes_stable_key_uq" ON "palettes" USING btree ("stable_key");--> statement-breakpoint
CREATE INDEX "palettes_status_active_idx" ON "palettes" USING btree ("status","active");--> statement-breakpoint
CREATE UNIQUE INDEX "payment_attempts_provider_idempotency_uq" ON "payment_attempts" USING btree ("provider","idempotency_key");--> statement-breakpoint
CREATE INDEX "payment_attempts_order_idx" ON "payment_attempts" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "prompt_versions_version_uq" ON "prompt_versions" USING btree ("version");--> statement-breakpoint
CREATE INDEX "qa_reviews_job_created_idx" ON "qa_reviews" USING btree ("job_id","created_at");--> statement-breakpoint
CREATE INDEX "story_interpretations_request_idx" ON "story_interpretations" USING btree ("request_id");--> statement-breakpoint
CREATE UNIQUE INDEX "symbols_stable_key_uq" ON "symbols" USING btree ("stable_key");--> statement-breakpoint
CREATE INDEX "symbols_status_active_idx" ON "symbols" USING btree ("status","active");--> statement-breakpoint
CREATE UNIQUE INDEX "users_external_id_uq" ON "users" USING btree ("external_id");--> statement-breakpoint
CREATE UNIQUE INDEX "visual_metaphors_stable_key_uq" ON "visual_metaphors" USING btree ("stable_key");--> statement-breakpoint
CREATE INDEX "visual_metaphors_status_active_idx" ON "visual_metaphors" USING btree ("status","active");