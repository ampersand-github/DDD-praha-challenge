/*
  Warnings:

  - You are about to drop the `ParticipantHavingTaskProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantHavingTaskProgress" DROP CONSTRAINT "ParticipantHavingTaskProgress_participantHavingTaskId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantHavingTaskProgress" DROP CONSTRAINT "ParticipantHavingTaskProgress_progressStatus_fkey";

-- DropTable
DROP TABLE "ParticipantHavingTaskProgress";

-- CreateTable
CREATE TABLE "TaskProgress" (
    "taskProgressId" TEXT NOT NULL,
    "participantHavingTaskId" TEXT NOT NULL,
    "progressStatus" TEXT,

    PRIMARY KEY ("taskProgressId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_participantHavingTaskId_unique" ON "TaskProgress"("participantHavingTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_progressStatus_unique" ON "TaskProgress"("progressStatus");

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD FOREIGN KEY ("participantHavingTaskId") REFERENCES "ParticipantHavingTask"("participantHavingTaskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD FOREIGN KEY ("progressStatus") REFERENCES "ProgressStatus"("progressStatus") ON DELETE SET NULL ON UPDATE CASCADE;
