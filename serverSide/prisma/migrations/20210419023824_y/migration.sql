/*
  Warnings:

  - You are about to drop the column `teamId` on the `Pair` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_teamId_fkey";

-- AlterTable
ALTER TABLE "Pair" DROP COLUMN "teamId",
ADD COLUMN     "team" TEXT;

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("team") REFERENCES "Team"("teamId") ON DELETE SET NULL ON UPDATE CASCADE;
