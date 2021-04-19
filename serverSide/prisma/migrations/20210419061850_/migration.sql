/*
  Warnings:

  - Made the column `enrolledStatus` on table `EnrolledParticipant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `participantId` on table `EnrolledParticipant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EnrolledParticipant" ALTER COLUMN "enrolledStatus" SET NOT NULL,
ALTER COLUMN "participantId" SET NOT NULL;
