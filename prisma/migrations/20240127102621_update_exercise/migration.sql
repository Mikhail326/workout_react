/*
  Warnings:

  - Changed the type of `times` on the `Exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "times",
ADD COLUMN     "times" INTEGER NOT NULL;
