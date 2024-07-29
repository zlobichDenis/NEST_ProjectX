/*
  Warnings:

  - Added the required column `contact_email` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "contact_email" VARCHAR(2000) NOT NULL;
