import {Request, Response} from "express";
import ArtistRepository from "../Repository/ArtistRepository.js";

export default class ArtistController {
    public async getAllArtistsExecutor(request: Request<{}, {}, {}, {}>, response: Response) {
        try {
            const artistRepository = new ArtistRepository();
            const artists = await artistRepository.getAllArtists();

            response.status(201).json(artists);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async getSingleArtistExecutor(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
        const id = parseInt(request.params.artistId);

        try {
            if (!id) {
                throw new Error("id is not a number");
            }

            const artistRepository = new ArtistRepository();
            const artist = await artistRepository.getSingleArtist(id);

            response.status(201).json(artist);
        } catch (error: any) {
            switch (error.name) {
                case "EntityNotFoundError":
                    response.status(404).json({ error: error.message });
                    break;
                case "Error":
                    response.status(400).json({ error: error.message });
                    break;
                default:
                    response.status(500).json({ error: error });
                    break;
            }
        }
    }

    public async createArtistExecutor(request: Request<{}, {}, { name: string; image: string }, {}>, response: Response) {
        const { name, image } = request.body;

        try {
            if (!name || !image) {
                throw new Error("Missing parameters");
            }

            const artistRepository = new ArtistRepository();
            await artistRepository.createArtist(name, image);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async deleteArtistExecutor(request: Request<{artistId: string}, {}, {}, {}>, response: Response) {
        const id = parseInt(request.params.artistId);

        try {
            if (!id) {
                throw new Error("id is not a number");
            }

            const artistRepository = new ArtistRepository();
            await artistRepository.deleteArtist(id);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async updateArtistExecutor(request: Request<{ artistId: string }, {}, { name: string; image: string }, {}>, response: Response) {
        const {name, image} = request.body;
        const id = parseInt(request.params.artistId);

        try {
            if (!name || !image || id){
                throw new Error("Missing parameters");
            }

            const artistRepository = new ArtistRepository();
            const updateResult = artistRepository.updateArtist(id, name, image);

            response.status(201).json(updateResult);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async searchArtistsExecutor(request: Request<{}, {}, {}, { q: string }>, response: Response){
        //postman: localhost:3000/search?q=yourSearchTerm
        const query = request.query.q;

        try {
            if (!query){
                throw new Error("Query missing");
            }

            const artistRepository = new ArtistRepository();
            const artists = await artistRepository.searchArtists(query);

            response.status(201).json(artists);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }
}