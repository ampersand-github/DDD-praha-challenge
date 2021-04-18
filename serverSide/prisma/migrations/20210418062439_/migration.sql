/*
  Warnings:

  - The primary key for the `TaskGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupName` on the `TaskGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskGroupName]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskGroupName` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskGroupName` to the `TaskGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskGroupName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskGroup" DROP CONSTRAINT "TaskGroup_pkey",
DROP COLUMN "groupName",
ADD COLUMN     "taskGroupName" TEXT NOT NULL,
ADD PRIMARY KEY ("taskGroupName");

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskGroupName_unique" ON "Task"("taskGroupName");

-- AddForeignKey
ALTER TABLE "Task" ADD FOREIGN KEY ("taskGroupName") REFERENCES "TaskGroup"("taskGroupName") ON DELETE CASCADE ON UPDATE CASCADE;
