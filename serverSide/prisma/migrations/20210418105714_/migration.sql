/*
  Warnings:

  - A unique constraint covering the columns `[participantId]` on the table `EnrolledParticipant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participantId` to the `EnrolledParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnrolledParticipant" ADD COLUMN     "participantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledParticipant_participantId_unique" ON "EnrolledParticipant"("participantId");

-- AddForeignKey
ALTER TABLE "EnrolledParticipant" ADD FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE CASCADE ON UPDATE CASCADE;
