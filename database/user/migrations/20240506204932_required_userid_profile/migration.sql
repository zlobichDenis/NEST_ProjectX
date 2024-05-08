/*
  Warnings:

  - Made the column `user_id` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user"."profile" DROP CONSTRAINT "profile_user_id_fkey";

-- AlterTable
ALTER TABLE "user"."profile" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user"."profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
