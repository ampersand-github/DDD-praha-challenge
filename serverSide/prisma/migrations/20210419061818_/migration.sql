/*
  Warnings:

  - Made the column `pairName` on table `Pair` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pair" ALTER COLUMN "pairName" SET NOT NULL;
