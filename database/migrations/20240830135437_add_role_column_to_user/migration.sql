/*
  Warnings:

  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('SELLER', 'CLIENT');

-- AlterTable
ALTER TABLE "user" ADD COLUMN "role" "user_role" NOT NULL;
