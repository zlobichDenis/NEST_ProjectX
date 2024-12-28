/*
  Warnings:

  - You are about to drop the column `amount` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `profile_address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cart_item_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_address_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_product_id_fkey";

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "price" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "amount",
DROP COLUMN "product_id",
DROP COLUMN "shipping_address",
ADD COLUMN     "cart_item_id" UUID NOT NULL,
ADD COLUMN     "group_id" UUID NOT NULL,
ADD COLUMN     "shipping_address_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_address_address_id_key" ON "profile_address"("address_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cart_item_id_fkey" FOREIGN KEY ("cart_item_id") REFERENCES "cart_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "profile_address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;
