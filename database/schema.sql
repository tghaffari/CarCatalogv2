set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

 CREATE TABLE "public"."cars" (
	"carId" serial NOT NULL,
	"make" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"color" TEXT NOT NULL,
	"year" int NOT NULL
) WITH (
  OIDS=FALSE
);
