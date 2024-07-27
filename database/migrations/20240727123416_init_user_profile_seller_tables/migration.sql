-- CreateEnum
CREATE TYPE "provider" AS ENUM ('GOOGLE', 'YANDEX');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "provider" "provider" NOT NULL,
    "current_refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

INSERT INTO "user" (id, email, provider, current_refresh_token, updated_at)
VALUES ('f598b2d3-e9c8-4ca8-8a5c-fb233aae61bf', 'sgsdgk9232@gmail.com', 'GOOGLE', null, null);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" UUID,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller" (
    "id" UUID NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(500) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "logo" TEXT NOT NULL,
    "address" VARCHAR(2000) NOT NULL,
    "contact_phone_number" VARCHAR(2000) NOT NULL,
    "user_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "seller_full_name_key" ON "seller"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "seller_user_id_key" ON "seller"("user_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
