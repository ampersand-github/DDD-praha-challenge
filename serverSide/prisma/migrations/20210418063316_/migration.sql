/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `ParticipantHavingTask` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `ParticipantHavingTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantHavingTask" ADD COLUMN     "taskId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantHavingTask_taskId_unique" ON "ParticipantHavingTask"("taskId");

-- AddForeignKey
ALTER TABLE "ParticipantHavingTask" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;
