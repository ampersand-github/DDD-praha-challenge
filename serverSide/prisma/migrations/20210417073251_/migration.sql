-- CreateTable
CREATE TABLE "SomeData" (
    "id" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "number" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
