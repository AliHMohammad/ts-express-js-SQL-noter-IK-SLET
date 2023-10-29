import TrackRepository from "../Repository/TrackRepository.js";
export default class TrackController {
    constructor() { }
    ;
    async getSingleTrackExecutor(request, response) {
        const id = parseInt(request.params.trackId);
        try {
            if (!id) {
                throw new Error("Id is missing");
            }
            const trackRepository = new TrackRepository();
            const tracks = await trackRepository.getSingleTrack(id);
            response.status(201).json(tracks);
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
    async getAllTracksExecutor(request, response) {
        try {
            const trackRepository = new TrackRepository();
            const tracks = await trackRepository.getAllTacks();
            response.status(201).json(tracks);
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
    async deleteTrackExecutor(request, response) {
        const id = parseInt(request.params.trackId);
        try {
            if (!id)
                throw new Error("ID is missing");
            const trackRepository = new TrackRepository();
            await trackRepository.deleteTrack(id);
            response.status(204).json();
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
    async updateTrackExecutor(request, response) {
        const id = parseInt(request.params.trackId);
        const { title, artists, albums, duration } = request.body;
        try {
            if (!id || !duration || !title || !artists)
                throw new Error("Missing parameters");
            const trackRepository = new TrackRepository();
            const updatedTrack = await trackRepository.updateTrack(id, title, duration, artists, albums);
            response.status(201).json(updatedTrack);
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
    async createTrackExecutor(request, response) {
        const { title, artists, albums, duration } = request.body;
        try {
            if (!title || !duration)
                throw new Error("Missing parameters");
            const trackRepository = new TrackRepository();
            const track = await trackRepository.createTrack(title, duration, artists, albums);
            response.status(201).json(track);
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
    async searchTracks(request, response) {
        const query = request.query.q;
        try {
            if (!query)
                throw new Error("Missing query");
            const trackRepository = new TrackRepository();
            const tracks = await trackRepository.searchTracks(query);
            response.status(201).json(tracks);
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
    async getAllTracksFromArtistExecutor(request, response) {
        const id = parseInt(request.params.artistId);
        try {
            if (!id)
                throw new Error("artistId is missing");
            const trackRepository = new TrackRepository();
            const tracks = await trackRepository.getAllTracksFromArtist(id);
            response.status(201).json(tracks);
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
}
