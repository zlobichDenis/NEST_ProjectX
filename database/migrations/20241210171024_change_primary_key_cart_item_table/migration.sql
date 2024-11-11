/*
  Warnings:

  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cart_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "cart_item_pkey" PRIMARY KEY ("product_id", "cart_id");
