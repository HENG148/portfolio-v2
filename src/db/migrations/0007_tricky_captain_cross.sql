CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"public_id" text NOT NULL,
	"alt" text,
	"width" integer,
	"height" integer,
	"bytes" integer,
	"format" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "media_public_id_unique" UNIQUE("public_id")
);
