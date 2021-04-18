-- CreateTable
CREATE TABLE "TaskGroup" (
    "groupName" TEXT NOT NULL,

    PRIMARY KEY ("groupName")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL,
    "taskNo" INTEGER,
    "taskName" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("taskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task.taskNo_unique" ON "Task"("taskNo");
