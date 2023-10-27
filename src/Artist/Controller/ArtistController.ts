import { Request, Response } from "express";
import ArtistService from "../Service/ArtistService.js";

export default class ArtistController {
    public async getAllArtistsExecutor(request: Request<{}, {}, {}, {}>, response: Response) {
        try {
            const apiService = new ArtistService();
            const artists = await apiService.getAllArtists();

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

            const apiService = new ArtistService();
            const artist = await apiService.getSingleArtist(id);

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

            const apiService = new ArtistService();
            await apiService.createArtist(name, image);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }
}
