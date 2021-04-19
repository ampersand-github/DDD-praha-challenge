/*
  Warnings:

  - Made the column `generation` on table `Generation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Generation" ALTER COLUMN "generation" SET NOT NULL;
