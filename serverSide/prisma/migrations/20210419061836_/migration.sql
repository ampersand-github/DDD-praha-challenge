/*
  Warnings:

  - Made the column `teamId` on table `Pair` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamName` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pair" ALTER COLUMN "teamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "teamName" SET NOT NULL;
