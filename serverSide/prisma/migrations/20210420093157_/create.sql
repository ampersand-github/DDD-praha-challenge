-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantUpperLimitInPair" (
    "upperLimit" INTEGER NOT NULL,

    PRIMARY KEY ("upperLimit")
);

-- CreateTable
CREATE TABLE "ParticipantUpperLimitInTeam" (
    "upperLimit" INTEGER NOT NULL,

    PRIMARY KEY ("upperLimit")
);

-- CreateTable
CREATE TABLE "ParticipantLowerLimitInPair" (
    "lowerLimit" INTEGER NOT NULL,

    PRIMARY KEY ("lowerLimit")
);

-- CreateTable
CREATE TABLE "ParticipantLowerLimitInTeam" (
    "lowerLimit" INTEGER NOT NULL,

    PRIMARY KEY ("lowerLimit")
);

-- CreateTable
CREATE TABLE "EnrolledStatus" (
    "enrolledStatus" TEXT NOT NULL,

    PRIMARY KEY ("enrolledStatus")
);

-- CreateTable
CREATE TABLE "ProgressStatus" (
    "progressStatus" TEXT NOT NULL,

    PRIMARY KEY ("progressStatus")
);

-- CreateTable
CREATE TABLE "TaskGroup" (
    "taskGroupName" TEXT NOT NULL,

    PRIMARY KEY ("taskGroupName")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mailAddress" TEXT NOT NULL,
    "pairId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("participantId")
);

-- CreateTable
CREATE TABLE "EnrolledParticipant" (
    "enrolledParticipantId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "enrolledStatus" TEXT NOT NULL,

    PRIMARY KEY ("enrolledParticipantId")
);

-- CreateTable
CREATE TABLE "Pair" (
    "pairId" TEXT NOT NULL,
    "pairName" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("pairId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL,
    "taskNo" INTEGER,
    "taskName" TEXT,
    "description" TEXT,
    "taskGroupName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
        PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "ParticipantHavingTask" (
    "participantHavingTaskId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    PRIMARY KEY ("participantHavingTaskId")
);

-- CreateTable
CREATE TABLE "TaskProgress" (
    "taskProgressId" TEXT NOT NULL,
    "participantHavingTaskId" TEXT NOT NULL,
    "progressStatus" TEXT,

    PRIMARY KEY ("taskProgressId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantAR.mailAddress_unique" ON "ParticipantAR"("mailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledParticipant_participantId_unique" ON "EnrolledParticipant"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Pair.pairName_teamId_unique" ON "Pair"("pairName", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team.teamName_unique" ON "Team"("teamName");

-- CreateIndex
CREATE UNIQUE INDEX "Task.taskNo_unique" ON "Task"("taskNo");

-- CreateIndex
CREATE UNIQUE INDEX "Task.taskName_unique" ON "Task"("taskName");

-- CreateIndex
CREATE UNIQUE INDEX "Task.description_unique" ON "Task"("description");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantHavingTask_taskId_unique" ON "ParticipantHavingTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_participantHavingTaskId_unique" ON "TaskProgress"("participantHavingTaskId");

-- AddForeignKey
ALTER TABLE "Participant" ADD FOREIGN KEY ("pairId") REFERENCES "Pair"("pairId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledParticipant" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledParticipant" ADD FOREIGN KEY ("enrolledStatus") REFERENCES "EnrolledStatus"("enrolledStatus") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD FOREIGN KEY ("taskGroupName") REFERENCES "TaskGroup"("taskGroupName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantHavingTask" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantHavingTask" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD FOREIGN KEY ("participantHavingTaskId") REFERENCES "ParticipantHavingTask"("participantHavingTaskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD FOREIGN KEY ("progressStatus") REFERENCES "ProgressStatus"("progressStatus") ON DELETE SET NULL ON UPDATE CASCADE;
