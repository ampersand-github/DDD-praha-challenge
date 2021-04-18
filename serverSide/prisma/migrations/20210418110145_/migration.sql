/*
  Warnings:

  - You are about to drop the column `pairId` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `participantId` to the `Pair` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pairId_fkey";

-- AlterTable
ALTER TABLE "Pair" ADD COLUMN     "participantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "pairId";

-- CreateTable
CREATE TABLE "_PairToParticipant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PairToParticipant_AB_unique" ON "_PairToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_PairToParticipant_B_index" ON "_PairToParticipant"("B");

-- AddForeignKey
ALTER TABLE "_PairToParticipant" ADD FOREIGN KEY ("A") REFERENCES "Pair"("pairId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PairToParticipant" ADD FOREIGN KEY ("B") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;
