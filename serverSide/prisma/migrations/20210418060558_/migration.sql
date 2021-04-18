-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrolledStatus" (
    "enrolledStatus" TEXT NOT NULL,

    PRIMARY KEY ("enrolledStatus")
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
CREATE TABLE "Participant" (
    "participantId" TEXT NOT NULL,
    "name" TEXT,
    "mailAddress" TEXT NOT NULL,
    "enrolledStatus" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("participantId")
);

-- CreateTable
CREATE TABLE "Generation" (
    "participantId" TEXT NOT NULL,
    "generation" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("participantId")
);

-- CreateTable
CREATE TABLE "Pair" (
    "pairId" TEXT NOT NULL,
    "pairName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("pairId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_enrolledStatus_unique" ON "Participant"("enrolledStatus");

-- AddForeignKey
ALTER TABLE "Participant" ADD FOREIGN KEY ("enrolledStatus") REFERENCES "EnrolledStatus"("enrolledStatus") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD FOREIGN KEY ("pairId") REFERENCES "Pair"("pairId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generation" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;
