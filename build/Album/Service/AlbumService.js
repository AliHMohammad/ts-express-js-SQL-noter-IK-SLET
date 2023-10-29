import { ILike } from "typeorm";
import { Albums } from "../Model/Albums.js";
import { AppDataSource } from "../../Database/data-source.js";
import { Artists } from "../../Artist/Model/Artists.js";
import { Tracks } from "../../Model/Tracks.js";
export default class AlbumService {
    repository;
    constructor() {
        this.repository = AppDataSource.getRepository(Albums);
    }
    async getAllAlbums() {
        const albums = await this.repository.find({
            relations: {
                tracks: true,
                artists: true
            },
            order: {
                title: "ASC",
                artists: {
                    name: "ASC"
                },
                tracks: {
                    title: "ASC"
                }
            }
        });
        if (!albums.length) {
            throw new Error("No albums found");
        }
        return albums;
    }
    async getSingleAlbum(id) {
        return await this.repository.findOneOrFail({
            relations: {
                artists: true,
                tracks: true
            },
            where: {
                id: id
            },
            order: {
                artists: {
                    name: "ASC"
                },
                tracks: {
                    title: "ASC"
                }
            }
        });
    }
    async createAlbum(title, yearOfRelease, image, artists, tracks) {
        const artistsRepository = AppDataSource.getRepository(Artists);
        const tracksRepository = AppDataSource.getRepository(Tracks);
        // 1. Create the Album
        const newAlbum = this.repository.create({
            title,
            image,
            yearOfRelease,
            artists: [],
            tracks: [],
        });
        const savedAlbum = await this.repository.save(newAlbum);
        // 2. Create and Save Artists
        const savedArtists = await Promise.all(artists.map(async (artistData) => {
            const newArtist = artistsRepository.create(artistData);
            return await artistsRepository.save(newArtist);
        }));
        // 3. Create and Save Tracks
        const savedTracks = await Promise.all(tracks.map(async (trackData) => {
            const newTrack = tracksRepository.create(trackData);
            const savedTrack = await tracksRepository.save(newTrack);
            // 3.5 Create and save artists and associate it with their track
            savedTrack.artists.map(async (artistData) => {
                const newArtist = artistsRepository.create(artistData);
                const savedArtist = await artistsRepository.save(newArtist);
                savedTrack.artists.push(savedArtist);
            });
            return savedTrack;
        }));
        // 4. Associate Artists and Tracks with the Album
        savedAlbum.artists = savedArtists;
        savedAlbum.tracks = savedTracks;
        return await this.repository.save(savedAlbum);
    }
    async updateAlbum(id, title, yearOfRelease, image, artists, tracks) {
        const newAlbum = new Albums();
        newAlbum.title = title;
        newAlbum.yearOfRelease = yearOfRelease;
        newAlbum.image = image;
        const updateResult = await this.repository.createQueryBuilder("album")
            .update()
            .set(newAlbum)
            .where("id = :id", { id })
            .execute();
        if (!updateResult.affected) {
            throw new Error("Could not update album with specified ID");
        }
        const updatedAlbum = await this.repository.findOneOrFail({
            where: {
                id
            }
        });
        artists ? updatedAlbum.artists = artists : null;
        tracks ? updatedAlbum.tracks = tracks : null;
        await this.repository.save(updatedAlbum);
        return updatedAlbum;
    }
    async deleteAlbum(id) {
        console.log("delete");
        const deleteResult = await this.repository.createQueryBuilder("album")
            .delete()
            .where("id = :id", { id })
            .execute();
        if (!deleteResult.affected) {
            throw new Error("Could not delete album with specified ID");
        }
        return deleteResult;
    }
    async searchAlbums(query) {
        const albums = await this.repository.find({
            relations: {
                tracks: true,
                artists: true
            },
            where: {
                title: ILike(`%${query}%`)
            },
            order: {
                title: "ASC",
                artists: {
                    name: "ASC"
                },
                tracks: {
                    title: "ASC"
                }
            }
        });
        if (!albums.length) {
            throw new Error("Could not find any albums");
        }
        return albums;
    }
}
