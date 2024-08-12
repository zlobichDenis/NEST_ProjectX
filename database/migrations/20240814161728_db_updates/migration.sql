/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `seller_address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "video" ADD COLUMN     "name" VARCHAR(510) NOT NULL,
ALTER COLUMN "likes_count" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "seller_address_address_id_key" ON "seller_address"("address_id");
