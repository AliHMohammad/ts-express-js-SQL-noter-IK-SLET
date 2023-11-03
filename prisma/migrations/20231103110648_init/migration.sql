/*
  Warnings:

  - You are about to drop the `albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `albums_tracks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artists_albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artists_tracks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tracks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `albums_tracks` DROP FOREIGN KEY `albums_tracks_album_id_fkey`;

-- DropForeignKey
ALTER TABLE `albums_tracks` DROP FOREIGN KEY `albums_tracks_track_id_fkey`;

-- DropForeignKey
ALTER TABLE `artists_albums` DROP FOREIGN KEY `artists_albums_album_id_fkey`;

-- DropForeignKey
ALTER TABLE `artists_albums` DROP FOREIGN KEY `artists_albums_artist_id_fkey`;

-- DropForeignKey
ALTER TABLE `artists_tracks` DROP FOREIGN KEY `artists_tracks_artist_id_fkey`;

-- DropForeignKey
ALTER TABLE `artists_tracks` DROP FOREIGN KEY `artists_tracks_track_id_fkey`;

-- DropTable
DROP TABLE `albums`;

-- DropTable
DROP TABLE `albums_tracks`;

-- DropTable
DROP TABLE `artists`;

-- DropTable
DROP TABLE `artists_albums`;

-- DropTable
DROP TABLE `artists_tracks`;

-- DropTable
DROP TABLE `tracks`;

-- CreateTable
CREATE TABLE `album` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `year_of_release` INTEGER NOT NULL,
    `image` VARCHAR(1000) NULL DEFAULT 'anon-billed',

    UNIQUE INDEX `album_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(1000) NULL DEFAULT 'anon-billed',

    UNIQUE INDEX `artist_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `track` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `duration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `album_track` (
    `album_id` INTEGER NOT NULL,
    `track_id` INTEGER NOT NULL,

    PRIMARY KEY (`album_id`, `track_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist_track` (
    `artist_id` INTEGER NOT NULL,
    `track_id` INTEGER NOT NULL,

    PRIMARY KEY (`artist_id`, `track_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist_album` (
    `artist_id` INTEGER NOT NULL,
    `album_id` INTEGER NOT NULL,

    PRIMARY KEY (`artist_id`, `album_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `album_track` ADD CONSTRAINT `album_track_track_id_fkey` FOREIGN KEY (`track_id`) REFERENCES `track`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `album_track` ADD CONSTRAINT `album_track_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist_track` ADD CONSTRAINT `artist_track_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist_track` ADD CONSTRAINT `artist_track_track_id_fkey` FOREIGN KEY (`track_id`) REFERENCES `track`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist_album` ADD CONSTRAINT `artist_album_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist_album` ADD CONSTRAINT `artist_album_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
