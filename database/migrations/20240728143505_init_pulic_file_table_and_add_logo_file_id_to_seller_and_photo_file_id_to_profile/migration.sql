/*
  Warnings:

  - You are about to drop the column `photo` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photo_file_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logo_file_id]` on the table `seller` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "photo",
ADD COLUMN     "photo_file_id" UUID;

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "logo",
ADD COLUMN     "logo_file_id" UUID;

-- CreateTable
CREATE TABLE "public_file" (
    "id" UUID NOT NULL,
    "key" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "public_file_id_key" ON "public_file"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_photo_file_id_key" ON "profile"("photo_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "seller_logo_file_id_key" ON "seller"("logo_file_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_photo_file_id_fkey" FOREIGN KEY ("photo_file_id") REFERENCES "public_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_logo_file_id_fkey" FOREIGN KEY ("logo_file_id") REFERENCES "public_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
