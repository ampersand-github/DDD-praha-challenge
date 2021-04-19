/*
  Warnings:

  - You are about to drop the column `pairId` on the `Participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pairId_fkey";

-- AlterTable
ALTER TABLE "Pair" ADD COLUMN     "participantId" TEXT;

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "pairId";

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE SET NULL ON UPDATE CASCADE;
