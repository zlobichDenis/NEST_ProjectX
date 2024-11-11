/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `items` on the `cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "items",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "cart_item" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "cart_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_customer_id_key" ON "cart"("customer_id");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
