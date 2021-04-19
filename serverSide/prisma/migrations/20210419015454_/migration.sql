/*
  Warnings:

  - You are about to drop the column `participantId` on the `Pair` table. All the data in the column will be lost.
  - You are about to drop the `_PairToParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PairToParticipant" DROP CONSTRAINT "_PairToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_PairToParticipant" DROP CONSTRAINT "_PairToParticipant_B_fkey";

-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_participantId_fkey";

-- AlterTable
ALTER TABLE "Pair" DROP COLUMN "participantId";

-- DropTable
DROP TABLE "_PairToParticipant";
