/*
  Warnings:

  - You are about to drop the column `yearOfRelease` on the `albums` table. All the data in the column will be lost.
  - Added the required column `year_of_release` to the `albums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `albums` DROP COLUMN `yearOfRelease`,
    ADD COLUMN `year_of_release` INTEGER NOT NULL;
