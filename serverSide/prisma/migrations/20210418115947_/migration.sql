/*
  Warnings:

  - The primary key for the `ParticipantHavingTaskProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `taskProgress` on the `ParticipantHavingTaskProgress` table. All the data in the column will be lost.
  - Added the required column `taskProgressId` to the `ParticipantHavingTaskProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantHavingTaskProgress" DROP CONSTRAINT "ParticipantHavingTaskProgress_pkey",
DROP COLUMN "taskProgress",
ADD COLUMN     "taskProgressId" TEXT NOT NULL,
ADD PRIMARY KEY ("taskProgressId");
