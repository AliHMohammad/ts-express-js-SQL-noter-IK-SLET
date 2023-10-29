/*
  Warnings:

  - You are about to drop the column `year_of_release` on the `albums` table. All the data in the column will be lost.
  - Added the required column `yearOfRelease` to the `albums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `albums` DROP COLUMN `year_of_release`,
    ADD COLUMN `yearOfRelease` INTEGER NOT NULL;
