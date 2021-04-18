/*
  Warnings:

  - The primary key for the `EnrolledParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enrolledParticipant` on the `EnrolledParticipant` table. All the data in the column will be lost.
  - Added the required column `enrolledParticipantId` to the `EnrolledParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnrolledParticipant" DROP CONSTRAINT "EnrolledParticipant_pkey",
DROP COLUMN "enrolledParticipant",
ADD COLUMN     "enrolledParticipantId" TEXT NOT NULL,
ADD PRIMARY KEY ("enrolledParticipantId");
