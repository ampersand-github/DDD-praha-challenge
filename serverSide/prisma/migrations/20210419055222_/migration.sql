/*
  Warnings:

  - A unique constraint covering the columns `[pairName,teamId]` on the table `Pair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mailAddress]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskName]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamName]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pair.pairName_teamId_unique" ON "Pair"("pairName", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant.mailAddress_unique" ON "Participant"("mailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Task.taskName_unique" ON "Task"("taskName");

-- CreateIndex
CREATE UNIQUE INDEX "Task.description_unique" ON "Task"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Team.teamName_unique" ON "Team"("teamName");
