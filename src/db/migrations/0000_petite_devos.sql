CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text,
	"description" text NOT NULL,
	"image_url" text,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"github_url" text,
	"live_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'completed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
