import ArtistService from "../Service/ArtistService.js";
export default class ArtistController {
    async getAllArtistsExecutor(request, response) {
        try {
            const apiService = new ArtistService();
            const artists = await apiService.getAllArtists();
            response.status(201).json(artists);
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
    async getSingleArtistExecutor(request, response) {
        const id = parseInt(request.params.artistId);
        try {
            if (!id) {
                throw new Error("id is not a number");
            }
            const apiService = new ArtistService();
            const artist = await apiService.getSingleArtist(id);
            response.status(201).json(artist);
        }
        catch (error) {
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
    async createArtistExecutor(request, response) {
        const { name, image } = request.body;
        try {
            if (!name || !image) {
                throw new Error("Missing parameters");
            }
            const apiService = new ArtistService();
            await apiService.createArtist(name, image);
            response.status(204).json();
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            }
            else {
                response.status(500).json({ error: error.message });
            }
        }
    }
    async deleteArtistExecutor(request, response) {
        const id = parseInt(request.params.artistId);
        try {
            if (!id) {
                throw new Error("id is not a number");
            }
            const apiService = new ArtistService();
            await apiService.deleteArtist(id);
            response.status(204).json();
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            }
            else {
                response.status(500).json({ error: error.message });
            }
        }
    }
    async updateArtistExecutor(request, response) {
        const { name, image } = request.body;
        const id = parseInt(request.params.artistId);
        try {
            if (!name || !image || id) {
                throw new Error("Missing parameters");
            }
            const apiService = new ArtistService();
            const updateResult = apiService.updateArtist(id, name, image);
            response.status(201).json(updateResult);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            }
            else {
                response.status(500).json({ error: error.message });
            }
        }
    }
    async searchArtistsExecutor(request, response) {
        //postman: localhost:3000/search?q=yourSearchTerm
        const query = request.query.q;
        try {
            if (!query) {
                throw new Error("Query missing");
            }
            const apiService = new ArtistService();
            const artists = await apiService.searchArtists(query);
            response.status(201).json(artists);
        }
        catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            }
            else {
                response.status(500).json({ error: error.message });
            }
        }
    }
}
