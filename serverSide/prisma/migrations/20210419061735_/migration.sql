/*
  Warnings:

  - Made the column `name` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mailAddress` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "mailAddress" SET NOT NULL;
