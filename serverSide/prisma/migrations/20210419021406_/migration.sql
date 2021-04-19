/*
  Warnings:

  - You are about to drop the column `pairId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_pairId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "pairId";
