import { Request, Response } from "express";
import { AppDataSource } from "../Database/data-source.js";
import { Albums } from "../Model/Albums.js";
import { Artists } from "../Model/Artists.js";
import { Tracks } from "../Model/Tracks.js";
import { ILike } from "typeorm";

const trackRepository = AppDataSource.getRepository(Tracks);

//GET SINGLE
async function getSingleTrack(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
    
    try {
        const id = Number(request.params.trackId);

        const track = await trackRepository.createQueryBuilder("tracks")
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

//CREATE
async function createTrack(request: Request<{}, {}, { title: string, duration: string, artists: Artists[], albums: Albums[] }, {}>, response: Response) {
    
    const title = request.body.title;
    const duration = parseInt(request.body.duration);
    const artists = request.body.artists;
    const albums = request.body.albums;

    try {
        
        const newTrack = trackRepository.create({
            title,
            duration,
            artists: artists ?? [],
            albums: albums ?? []
        })

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
async function deleteTrack(request: Request<{trackId : string}, {}, {}, {}>, response: Response) {

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


//SEARCH
async function searchTracks(request: Request<{}, {}, {}, {q: string}>, response: Response) {
    
    const q = request.query.q;

    try {
        const tracks = await trackRepository.find({
            where: {
                title: ILike(`%${q}%`),
            },
            relations: ["artists", "albums"],
            order: {
                //Order by track
                title: "ASC"
            }
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


export { getAllTracks, getSingleTrack, createTrack, deleteTrack, searchTracks };