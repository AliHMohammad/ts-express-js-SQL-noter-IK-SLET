-- CreateTable
CREATE TABLE `albums` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `year_of_release` INTEGER NULL,
    `image` VARCHAR(1000) NULL DEFAULT 'anon-billed',

    UNIQUE INDEX `IDX_2c85c318a6c245b0eecc208195`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `albums_tracks` (
    `album_id` INTEGER NOT NULL,
    `track_id` INTEGER NOT NULL,

    INDEX `IDX_3d38c2b257494f33bb66c9c13d`(`track_id`),
    INDEX `IDX_81913922fba0b198e60114c7f2`(`album_id`),
    PRIMARY KEY (`album_id`, `track_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(1000) NULL DEFAULT 'anon-billed',

    UNIQUE INDEX `IDX_70c3685e197743b963339d158c`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artists_albums` (
    `artist_id` INTEGER NOT NULL,
    `album_id` INTEGER NOT NULL,

    INDEX `IDX_67b48ae70968c9ec1c19db85fd`(`artist_id`),
    INDEX `IDX_99d3391589c77a48ae6b4b599b`(`album_id`),
    PRIMARY KEY (`artist_id`, `album_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artists_tracks` (
    `artist_id` INTEGER NOT NULL,
    `track_id` INTEGER NOT NULL,

    INDEX `IDX_4205757a13a99b3e70e7ad31f8`(`artist_id`),
    INDEX `IDX_9934327d3098af13d3ebbc0bb6`(`track_id`),
    PRIMARY KEY (`artist_id`, `track_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tracks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `duration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `albums_tracks` ADD CONSTRAINT `FK_3d38c2b257494f33bb66c9c13da` FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `albums_tracks` ADD CONSTRAINT `FK_81913922fba0b198e60114c7f24` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_albums` ADD CONSTRAINT `FK_67b48ae70968c9ec1c19db85fd8` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_albums` ADD CONSTRAINT `FK_99d3391589c77a48ae6b4b599b2` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artists_tracks` ADD CONSTRAINT `FK_4205757a13a99b3e70e7ad31f87` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_tracks` ADD CONSTRAINT `FK_9934327d3098af13d3ebbc0bb6f` FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

