/*
  Warnings:

  - You are about to drop the `practice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "practice";

-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
