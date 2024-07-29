/*
  Warnings:

  - You are about to drop the column `photo_file_id` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `logo_file_id` on the `seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photo_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logo_id]` on the table `seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "currency" AS ENUM ('RUB', 'USD');

-- CreateEnum
CREATE TYPE "region_key" AS ENUM ('RU');

-- CreateEnum
CREATE TYPE "product_status" AS ENUM ('NOT_AVAILABLE', 'AVAILABLE');

-- CreateEnum
CREATE TYPE "moderation_status" AS ENUM ('DECLINED', 'IN_PROGRESS', 'APPROVED');

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_photo_file_id_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_logo_file_id_fkey";

-- DropIndex
DROP INDEX "profile_photo_file_id_key";

-- DropIndex
DROP INDEX "seller_logo_file_id_key";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "post_index" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "photo_file_id",
ADD COLUMN     "photo_id" UUID;

-- AlterTable
ALTER TABLE "public_file" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "logo_file_id",
ADD COLUMN     "logo_id" UUID;

-- CreateTable
CREATE TABLE "tag" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" UUID NOT NULL,
    "currency" "currency" NOT NULL,
    "key" "region_key" NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "name" VARCHAR(1000) NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "product_status" NOT NULL,
    "moderation_status" "moderation_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_videos" (
    "video_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_videos_pkey" PRIMARY KEY ("video_id")
);

-- CreateTable
CREATE TABLE "product_photo" (
    "photo_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "region_product" (
    "product_id" UUID NOT NULL,
    "region_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "region_product_pkey" PRIMARY KEY ("product_id","region_id")
);

-- CreateTable
CREATE TABLE "product_tag" (
    "product_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "product_tag_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "seller_product" (
    "product_id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "video" (
    "id" UUID NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_id" UUID NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_id" UUID NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "region_currency_key" ON "region"("currency");

-- CreateIndex
CREATE UNIQUE INDEX "region_key_key" ON "region"("key");

-- CreateIndex
CREATE UNIQUE INDEX "seller_product_product_id_key" ON "seller_product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "video_file_id_key" ON "video"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "photo_file_id_key" ON "photo"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_photo_id_key" ON "profile"("photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "seller_logo_id_key" ON "seller"("logo_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_photo" ADD CONSTRAINT "product_photo_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_photo" ADD CONSTRAINT "product_photo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region_product" ADD CONSTRAINT "region_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region_product" ADD CONSTRAINT "region_product_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_product" ADD CONSTRAINT "seller_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_product" ADD CONSTRAINT "seller_product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
