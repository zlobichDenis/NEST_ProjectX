/*
  Warnings:

  - A unique constraint covering the columns `[raw_name]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `raw_name` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "raw_name" VARCHAR NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_raw_name_key" ON "product"("raw_name");
