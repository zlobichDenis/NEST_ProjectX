-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateEnum
CREATE TYPE "user"."provider" AS ENUM ('GOOGLE');

-- CreateTable
CREATE TABLE "user"."user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "provider" "user"."provider" NOT NULL,
    "original_id" UUID NOT NULL,
    "current_refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_original_id_key" ON "user"."user"("original_id");
