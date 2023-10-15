import { AppDataSource } from "../Database/data-source.js";
import { Albums } from "../Model/Albums.js";
import { Artists } from "../Model/Artists.js";
import { Tracks } from "../Model/Tracks.js";
const albumRepository = AppDataSource.getRepository(Albums);
const artistsRepository = AppDataSource.getRepository(Artists);
const trackRepository = AppDataSource.getRepository(Tracks);
//GET SINGLE
async function getSingleAlbum(request, response) {
    //Get all information from album by ID
    try {
        const id = parseInt(request.params.albumId);
        const albums = await albumRepository
            .createQueryBuilder("album")
            .innerJoinAndSelect("album.tracks", "tracks")
            .innerJoinAndSelect("album.artists", "artists")
            .innerJoinAndSelect("tracks.artists", "trackArtists")
            .where("album.id = :id", { id })
            .orderBy("tracks.title")
            .getOneOrFail();
        response.status(200).json(albums);
    }
    catch (error) {
        switch (error.name) {
            case "EntityNotFoundError":
                response.status(404).json({ error: error.message });
                break;
            default:
                response.status(500).json({ error: error.message });
                break;
        }
    }
}
//GET ALL
async function getAllAlbums(request, response) {
    //Get all information from albums
    try {
        const albums = await albumRepository
            .createQueryBuilder("album")
            .innerJoinAndSelect("album.tracks", "tracks")
            .innerJoinAndSelect("album.artists", "artists")
            .innerJoinAndSelect("tracks.artists", "trackArtists")
            .orderBy("album.title")
            .getMany();
        if (albums.length === 0) {
            response.status(404).json({ error: "Could not find any albums" });
        }
        response.status(200).json(albums);
    }
    catch (error) {
        response.status(500).json({ error: error });
    }
}
//DELETE
async function deleteAlbum(request, response) {
    const id = parseInt(request.params.albumId);
    try {
        //Sletter også på cascade, da dette er angivet i vores entitites og vores SQL backend (datagrip)
        const deleteResult = await albumRepository.createQueryBuilder("album")
            .delete()
            .where("id = :id", { id })
            .execute();
        if (deleteResult.affected === 0) {
            response.status(404).json({ message: "No album found by specified ID" });
        }
        response.status(204).json();
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
}
//UPDATE
async function updateAlbum(request, response) {
}
//CREATE
async function createAlbum(request, response) {
    const { title, image, artists, tracks } = request.body;
    const yearOfRelease = parseInt(request.body.yearOfRelease);
    try {
        if (!title || !yearOfRelease || !image || !artists || !tracks) {
            throw new Error("Parameters missing");
        }
        // 1. Create the Album
        const newAlbum = albumRepository.create({
            title,
            image,
            yearOfRelease,
            artists: [],
            tracks: []
        });
        const savedAlbum = await albumRepository.save(newAlbum);
        // 2. Create and Save Artists
        const savedArtists = await Promise.all(artists.map(async (artistData) => {
            const newArtist = artistsRepository.create(artistData);
            return await artistsRepository.save(newArtist);
        }));
        // 3. Create and Save Tracks
        const savedTracks = await Promise.all(tracks.map(async (trackData) => {
            const newTrack = trackRepository.create(trackData);
            const savedTrack = await trackRepository.save(newTrack);
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
        await albumRepository.save(savedAlbum);
        response.status(204).json({});
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
}
//SEARCH
async function searchAlbums(request, response) {
}
export { getAllAlbums, getSingleAlbum, deleteAlbum, createAlbum };
