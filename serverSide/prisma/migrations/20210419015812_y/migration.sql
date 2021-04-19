-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "pairId" TEXT;

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
ALTER TABLE "Participant" ADD FOREIGN KEY ("pairId") REFERENCES "Pair"("pairId") ON DELETE SET NULL ON UPDATE CASCADE;
