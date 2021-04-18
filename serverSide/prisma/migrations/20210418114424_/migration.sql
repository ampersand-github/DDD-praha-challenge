/*
  Warnings:

  - You are about to drop the column `progressStatus` on the `ParticipantHavingTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantHavingTask" DROP CONSTRAINT "ParticipantHavingTask_progressStatus_fkey";

-- DropIndex
DROP INDEX "ParticipantHavingTask_progressStatus_unique";

-- AlterTable
ALTER TABLE "ParticipantHavingTask" DROP COLUMN "progressStatus";

-- CreateTable
CREATE TABLE "ParticipantHavingTaskProgress" (
    "taskProgress" TEXT NOT NULL,
    "participantHavingTaskId" TEXT NOT NULL,
    "progressStatus" TEXT,

    PRIMARY KEY ("taskProgress")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantHavingTaskProgress_participantHavingTaskId_unique" ON "ParticipantHavingTaskProgress"("participantHavingTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantHavingTaskProgress_progressStatus_unique" ON "ParticipantHavingTaskProgress"("progressStatus");

-- AddForeignKey
ALTER TABLE "ParticipantHavingTaskProgress" ADD FOREIGN KEY ("participantHavingTaskId") REFERENCES "ParticipantHavingTask"("participantHavingTaskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantHavingTaskProgress" ADD FOREIGN KEY ("progressStatus") REFERENCES "ProgressStatus"("progressStatus") ON DELETE SET NULL ON UPDATE CASCADE;
