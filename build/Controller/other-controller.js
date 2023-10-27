import { AppDataSource } from "../Database/data-source.js";
import { Albums } from "../Album/Model/Albums.js";
import { Artists } from "../Artist/Model/Artists.js";
import { Tracks } from "../Model/Tracks.js";
import { ILike } from "typeorm";
const albumRepository = AppDataSource.getRepository(Albums);
const artistsRepository = AppDataSource.getRepository(Artists);
const trackRepository = AppDataSource.getRepository(Tracks);
async function searchAll(request, response) {
    const q = request.query.q;
    try {
        const result = {
            tracks: [],
            albums: [],
            artists: [],
        };
        const tracks = await trackRepository.find({
            where: {
                title: ILike(`%${q}%`),
            },
            order: {
                title: "ASC",
            },
        });
        const albums = await albumRepository.find({
            where: {
                title: ILike(`%${q}%`),
            },
            order: {
                title: "ASC",
            },
        });
        const artists = await artistsRepository.find({
            where: {
                name: ILike(`%${q}%`),
            },
            order: {
                name: "ASC",
            },
        });
        result.tracks = tracks;
        result.artists = artists;
        result.albums = albums;
        response.status(201).json(result);
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
export { searchAll };
