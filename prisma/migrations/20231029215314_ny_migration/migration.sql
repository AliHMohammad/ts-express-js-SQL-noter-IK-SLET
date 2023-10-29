-- DropForeignKey
ALTER TABLE `albums_tracks` DROP FOREIGN KEY `FK_3d38c2b257494f33bb66c9c13da`;

-- DropForeignKey
ALTER TABLE `albums_tracks` DROP FOREIGN KEY `FK_81913922fba0b198e60114c7f24`;

-- DropForeignKey
ALTER TABLE `artists_albums` DROP FOREIGN KEY `FK_67b48ae70968c9ec1c19db85fd8`;

-- DropForeignKey
ALTER TABLE `artists_albums` DROP FOREIGN KEY `FK_99d3391589c77a48ae6b4b599b2`;

-- DropForeignKey
ALTER TABLE `artists_tracks` DROP FOREIGN KEY `FK_4205757a13a99b3e70e7ad31f87`;

-- DropForeignKey
ALTER TABLE `artists_tracks` DROP FOREIGN KEY `FK_9934327d3098af13d3ebbc0bb6f`;

-- AddForeignKey
ALTER TABLE `albums_tracks` ADD CONSTRAINT `albums_tracks_track_id_fkey` FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `albums_tracks` ADD CONSTRAINT `albums_tracks_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_tracks` ADD CONSTRAINT `artists_tracks_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_tracks` ADD CONSTRAINT `artists_tracks_track_id_fkey` FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_albums` ADD CONSTRAINT `artists_albums_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artists_albums` ADD CONSTRAINT `artists_albums_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `albums` RENAME INDEX `IDX_2c85c318a6c245b0eecc208195` TO `albums_title_key`;

-- RenameIndex
ALTER TABLE `albums_tracks` RENAME INDEX `IDX_3d38c2b257494f33bb66c9c13d` TO `albums_tracks_track_id_idx`;

-- RenameIndex
ALTER TABLE `albums_tracks` RENAME INDEX `IDX_81913922fba0b198e60114c7f2` TO `albums_tracks_album_id_idx`;

-- RenameIndex
ALTER TABLE `artists` RENAME INDEX `IDX_70c3685e197743b963339d158c` TO `artists_name_key`;

-- RenameIndex
ALTER TABLE `artists_albums` RENAME INDEX `IDX_67b48ae70968c9ec1c19db85fd` TO `artists_albums_artist_id_idx`;

-- RenameIndex
ALTER TABLE `artists_albums` RENAME INDEX `IDX_99d3391589c77a48ae6b4b599b` TO `artists_albums_album_id_idx`;

-- RenameIndex
ALTER TABLE `artists_tracks` RENAME INDEX `IDX_4205757a13a99b3e70e7ad31f8` TO `artists_tracks_artist_id_idx`;

-- RenameIndex
ALTER TABLE `artists_tracks` RENAME INDEX `IDX_9934327d3098af13d3ebbc0bb6` TO `artists_tracks_track_id_idx`;
