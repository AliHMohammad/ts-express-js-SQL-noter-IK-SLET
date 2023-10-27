/*
  Warnings:

  - Made the column `title` on table `albums` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year_of_release` on table `albums` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `albums` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `year_of_release` INTEGER NOT NULL;
