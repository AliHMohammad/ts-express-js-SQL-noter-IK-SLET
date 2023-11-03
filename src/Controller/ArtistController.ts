import {Request, Response} from "express";
import ArtistRepository from "../Repository/ArtistRepository.js";


export default class ArtistController {
    constructor() {}

    public async getAllArtistsExecutor(request: Request<{},{},{},{}>, response: Response) {

        try {
            const repository = new ArtistRepository();
            const artists = await repository.getAllArtists();

            response.status(201).json(artists);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async getSingleArtistExecutor(request: Request<{artistId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.artistId);

        try {
            if (!id) throw new Error("ID is not a number");
            const repository = new ArtistRepository();
            const artist = await repository.getSingleArtist(id);

            const result = {
                id: artist.id,
                name: artist.name,
                image: artist.image,
                tracks: artist.artistTrack.map((item) => {
                    return {
                        id: item.track.id,
                        title: item.track.title,
                        duration: item.track.duration
                    }
                })
            }

            response.status(201).json(result);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async searchArtists(request: Request<{artistId: string},{},{},{q: string}>, response: Response) {
        const query = request.query.q;

        try {
            if (!query) throw new Error("Query missing");

            const repository = new ArtistRepository();
            const artists = await repository.searchArtists(query);

            response.status(201).json(artists);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async deleteArtistExecutor(request: Request<{artistId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.artistId);

        try {
            if (!id) throw new Error("ID is not a number");
            const repository = new ArtistRepository();
            await repository.deleteArtist(id);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async createArtistExecutor(request: Request<{},{},{name: string, image: string},{}>, response: Response) {
        const {name, image} = request.body;

        try {
            if (!name || !image) throw new Error("Missing parameters");

            const repository = new ArtistRepository();
            const artist = await repository.createArtist(name, image);

            response.status(201).json(artist);

        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async updateArtistExecutor(request: Request<{artistId: string},{},{name: string, image: string},{}>, response: Response) {
        const id = parseInt(request.params.artistId);
        const {name, image} = request.body;

        try {
            const repository = new ArtistRepository();
            const artist = await repository.updateArtist(id, name, image);

            response.status(201).json(artist);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }
}