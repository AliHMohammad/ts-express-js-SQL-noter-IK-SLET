import { Request, Response } from "express";
import { AppDataSource } from "../Database/data-source.js";
import { Albums } from "../Album/Model/Albums.js";
import { Artists } from "../Artist/Model/Artists.js";
import { Tracks } from "../Model/Tracks.js";
import { ILike } from "typeorm";

const trackRepository = AppDataSource.getRepository(Tracks);
const artistsRepository = AppDataSource.getRepository(Artists);

//GET SINGLE
async function getSingleTrack(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
    try {
        const id = Number(request.params.trackId);

        const track = await trackRepository
            .createQueryBuilder("tracks")
            .innerJoinAndSelect("tracks.artists", "artists")
            .where("tracks.id = :id", { id })
            .orderBy("artists.name")
            .getOneOrFail();

        response.status(201).json(track);
    } catch (error: any) {
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
async function getAllTracks(request: Request<{}, {}, {}, {}>, response: Response) {
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
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//GET ALL TRACKS WITH THIS ARTIST
async function getAllTracksFromSingleArtist(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
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
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//CREATE
async function createTrack(request: Request<{}, {}, { title: string; duration: string; artists: Artists[]; albums: Albums[] }, {}>, response: Response) {
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
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//DELETE
async function deleteTrack(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
    const id = parseInt(request.params.trackId);

    try {
        //Sletter også på cascade (relations), da dette er angivet i vores entitites og vores SQL backend (datagrip)
        const deleteResult = await trackRepository.createQueryBuilder("track").delete().where("id = :id", { id }).execute();

        if (deleteResult.affected === 0) {
            throw new Error("Could not delete track by specified ID");
        }

        response.status(204).json({});
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//UPDATE
async function updateTrack(request: Request<{ trackId: string }, {}, { title: string; duration: string; artists?: Artists[]; albums?: Albums[] }, {}>, response: Response) {
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
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//SEARCH
async function searchTracks(request: Request<{}, {}, {}, { q: string }>, response: Response) {
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
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export { getAllTracks, getSingleTrack, createTrack, deleteTrack, searchTracks, updateTrack, getAllTracksFromSingleArtist };
