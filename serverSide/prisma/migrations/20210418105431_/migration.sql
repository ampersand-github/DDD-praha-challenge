/*
  Warnings:

  - You are about to drop the column `enrolledStatus` on the `Participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_enrolledStatus_fkey";

-- DropIndex
DROP INDEX "Participant_enrolledStatus_unique";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "enrolledStatus";

-- CreateTable
CREATE TABLE "EnrolledParticipant" (
    "enrolledParticipant" TEXT NOT NULL,
    "enrolledStatus" TEXT NOT NULL,

    PRIMARY KEY ("enrolledParticipant")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledParticipant_enrolledStatus_unique" ON "EnrolledParticipant"("enrolledStatus");

-- AddForeignKey
ALTER TABLE "EnrolledParticipant" ADD FOREIGN KEY ("enrolledStatus") REFERENCES "EnrolledStatus"("enrolledStatus") ON DELETE CASCADE ON UPDATE CASCADE;
