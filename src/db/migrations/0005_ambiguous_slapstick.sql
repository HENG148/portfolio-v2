CREATE TABLE "about" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_id" text NOT NULL,
	"bio" text NOT NULL,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"slides" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "about_profile_id_unique" UNIQUE("profile_id")
);
