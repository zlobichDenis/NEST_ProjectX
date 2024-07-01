/*
  Warnings:

  - You are about to drop the column `original_id` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user"."user_original_id_key";

-- AlterTable
ALTER TABLE "user"."user" DROP COLUMN "original_id";
