/*
  Warnings:

  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_file_id_fkey";

-- DropForeignKey
ALTER TABLE "product_photo" DROP CONSTRAINT "product_photo_photo_id_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_photo_id_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_logo_id_fkey";

-- DropTable
DROP TABLE "photo";

-- CreateTable
CREATE TABLE "image" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_id" UUID NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_file_id_key" ON "image"("file_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_photo" ADD CONSTRAINT "product_photo_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
