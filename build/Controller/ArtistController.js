import ArtistRepository from "../Repository/ArtistRepository.js";
export default class ArtistController {
    constructor() { }
    async getAllArtistsExecutor(request, response) {
        try {
            const repository = new ArtistRepository();
            const artists = await repository.getAllArtists();
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
            if (!id)
                throw new Error("ID is not a number");
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
                    };
                })
            };
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
    async searchArtists(request, response) {
        const query = request.query.q;
        try {
            if (!query)
                throw new Error("Query missing");
            const repository = new ArtistRepository();
            const artists = await repository.searchArtists(query);
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
    async deleteArtistExecutor(request, response) {
        const id = parseInt(request.params.artistId);
        try {
            if (!id)
                throw new Error("ID is not a number");
            const repository = new ArtistRepository();
            await repository.deleteArtist(id);
            response.status(204).json();
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
    async createArtistExecutor(request, response) {
        const { name, image } = request.body;
        try {
            if (!name || !image)
                throw new Error("Missing parameters");
            const repository = new ArtistRepository();
            const artist = await repository.createArtist(name, image);
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
    async updateArtistExecutor(request, response) {
        const id = parseInt(request.params.artistId);
        const { name, image } = request.body;
        try {
            const repository = new ArtistRepository();
            const artist = await repository.updateArtist(id, name, image);
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
}
