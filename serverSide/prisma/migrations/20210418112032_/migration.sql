-- CreateTable
CREATE TABLE "_PairToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PairToTeam_AB_unique" ON "_PairToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PairToTeam_B_index" ON "_PairToTeam"("B");

-- AddForeignKey
ALTER TABLE "_PairToTeam" ADD FOREIGN KEY ("A") REFERENCES "Pair"("pairId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PairToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("teamId") ON DELETE CASCADE ON UPDATE CASCADE;
