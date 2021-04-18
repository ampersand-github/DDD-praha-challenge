/*
  Warnings:

  - You are about to drop the column `teamId` on the `Pair` table. All the data in the column will be lost.
  - Added the required column `pairId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_teamId_fkey";

-- AlterTable
ALTER TABLE "Pair" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "pairId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY ("pairId") REFERENCES "Pair"("pairId") ON DELETE CASCADE ON UPDATE CASCADE;
