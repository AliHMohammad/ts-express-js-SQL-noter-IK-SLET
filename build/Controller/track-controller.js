import { AppDataSource } from "../Database/data-source.js";
import { Artists } from "../Artist/Model/Artists.js";
import { Tracks } from "../Model/Tracks.js";
import { ILike } from "typeorm";
const trackRepository = AppDataSource.getRepository(Tracks);
const artistsRepository = AppDataSource.getRepository(Artists);
//GET SINGLE
async function getSingleTrack(request, response) {
    try {
        const id = Number(request.params.trackId);
        const track = await trackRepository
            .createQueryBuilder("tracks")
            .innerJoinAndSelect("tracks.artists", "artists")
            .where("tracks.id = :id", { id })
            .orderBy("artists.name")
            .getOneOrFail();
        response.status(201).json(track);
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
async function getAllTracks(request, response) {
    try {
        const albums = await trackRepository
            .createQueryBuilder("tracks")
            .innerJoinAndSelect("tracks.artists", "artists")
            .orderBy({
            "tracks.title": "ASC",
            "artists.name": "ASC",
        })
            .getMany();
        if (albums.length === 0) {
            throw new Error("No albums found");
        }
        response.status(201).json(albums);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//GET ALL TRACKS WITH THIS ARTIST
async function getAllTracksFromSingleArtist(request, response) {
    const id = parseInt(request.params.artistId);
    try {
        const artist = await artistsRepository.findOneOrFail({
            where: {
                id: id,
            },
        });
        const tracks = await trackRepository
            .createQueryBuilder("tracks")
            .select("tracks.id AS id, tracks.title AS title, tracks.duration AS duration")
            .innerJoin("tracks.artists", "artists")
            .where("artists.id = :id", { id })
            .orderBy({
            "tracks.title": "ASC",
        })
            .execute();
        artist.tracks = tracks;
        response.status(201).json(artist);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//CREATE
async function createTrack(request, response) {
    try {
        const { title, artists, albums } = request.body;
        const duration = parseInt(request.body.duration);
        const newTrack = trackRepository.create({
            title,
            duration,
            artists: artists ?? [],
            albums: albums ?? [],
        });
        const savedTrack = await trackRepository.save(newTrack);
        response.status(201).json(savedTrack.id);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//DELETE
async function deleteTrack(request, response) {
    const id = parseInt(request.params.trackId);
    try {
        //Sletter også på cascade (relations), da dette er angivet i vores entitites og vores SQL backend (datagrip)
        const deleteResult = await trackRepository.createQueryBuilder("track").delete().where("id = :id", { id }).execute();
        if (deleteResult.affected === 0) {
            throw new Error("Could not delete track by specified ID");
        }
        response.status(204).json({});
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//UPDATE
async function updateTrack(request, response) {
    const id = parseInt(request.params.trackId);
    try {
        const duration = parseInt(request.body.duration);
        const { title, artists, albums } = request.body;
        if (!title || !duration) {
            throw new Error("missing Parameters");
        }
        // 1. Update album itself. Remember the id when create()
        const newTrack = trackRepository.create({ title, duration, id });
        const savedTrack = await trackRepository.save(newTrack);
        // 2. If artists and/or albums is given, then create associations to them. Save again.
        if (artists) {
            savedTrack.artists = artists;
            if (albums) {
                savedTrack.albums = albums;
            }
            await trackRepository.save(savedTrack);
        }
        response.status(201).json({ message: "Track Updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//SEARCH
async function searchTracks(request, response) {
    const q = request.query.q;
    try {
        const tracks = await trackRepository.find({
            where: {
                title: ILike(`%${q}%`),
            },
            relations: ["artists", "albums"],
            order: {
                //Order by track
                title: "ASC",
            },
        });
        if (tracks.length === 0) {
            throw new Error("Could not find any tracks with query");
        }
        response.status(201).json(tracks);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
export { getAllTracks, getSingleTrack, createTrack, deleteTrack, searchTracks, updateTrack, getAllTracksFromSingleArtist };
