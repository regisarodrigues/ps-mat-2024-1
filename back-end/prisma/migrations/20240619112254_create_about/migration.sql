-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "plates" DROP NOT NULL;

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
