/*
  Warnings:

  - You are about to drop the column `team` on the `Pair` table. All the data in the column will be lost.
  - You are about to drop the `_PairToTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PairToTeam" DROP CONSTRAINT "_PairToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_PairToTeam" DROP CONSTRAINT "_PairToTeam_B_fkey";

-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_team_fkey";

-- AlterTable
ALTER TABLE "Pair" DROP COLUMN "team",
ADD COLUMN     "teamId" TEXT;

-- DropTable
DROP TABLE "_PairToTeam";

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE SET NULL ON UPDATE CASCADE;
