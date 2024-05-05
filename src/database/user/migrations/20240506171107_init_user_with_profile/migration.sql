-- CreateEnum
CREATE TYPE "user"."provider" AS ENUM ('GOOGLE');

-- CreateTable
CREATE TABLE "user"."user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "provider" "user"."provider" NOT NULL,
    "original_id" CHAR(21) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."profile" (
    "id" UUID NOT NULL,
    "family_name" VARCHAR(255) NOT NULL,
    "given_name" VARCHAR(255) NOT NULL,
    "photos" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" UUID,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_original_id_key" ON "user"."user"("original_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "user"."profile"("user_id");

-- AddForeignKey
ALTER TABLE "user"."profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
