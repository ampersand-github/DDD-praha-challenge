-- CreateTable
CREATE TABLE "ProgressStatus" (
    "progressStatus" TEXT NOT NULL,

    PRIMARY KEY ("progressStatus")
);

-- CreateTable
CREATE TABLE "ParticipantHavingTask" (
    "participantHavingTaskId" TEXT NOT NULL,
    "progressStatus" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    PRIMARY KEY ("participantHavingTaskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantHavingTask_progressStatus_unique" ON "ParticipantHavingTask"("progressStatus");

-- AddForeignKey
ALTER TABLE "ParticipantHavingTask" ADD FOREIGN KEY ("progressStatus") REFERENCES "ProgressStatus"("progressStatus") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantHavingTask" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;
