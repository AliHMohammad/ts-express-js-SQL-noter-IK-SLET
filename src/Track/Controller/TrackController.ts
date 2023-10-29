import {Request, Response} from "express";
import {Artists} from "../../Artist/Model/Artists.js";
import TrackService from "../Service/TrackService.js";
import {Albums} from "../../Album/Model/Albums.js";


export default class TrackController {
    constructor() {};

    public async getSingleTrackExecutor(request: Request<{trackId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.trackId);

        try {
            if (!id){
                throw new Error("Id is missing");
            }

            const apiService = new TrackService();
            const tracks = await apiService.getSingleTrack(id);

            response.status(201).json(tracks);
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

    public async getAllTracksExecutor(request: Request<{},{},{},{}>, response: Response) {

        try {
            const apiService = new TrackService();
            const tracks = await apiService.getAllTacks();

            response.status(201).json(tracks);
        } catch (error: any){
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

    public async deleteTrackExecutor(request: Request<{trackId: string},{},{},{}>, response: Response){
        const id = parseInt(request.params.trackId);

        try {
            if (!id) throw new Error("ID is missing");

            const apiService = new TrackService();
            await apiService.deleteTrack(id);

            response.status(204).json();
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

    public async updateTrackExecutor(request: Request<{trackId: string},{},{title: string, duration: number, artists?: Artists[], albums?: Albums[]},{}>, response: Response) {
        const id = parseInt(request.params.trackId);
        const {title, artists, albums, duration} = request.body;

        try {
            if (!id || !duration || !title || !artists) throw new Error("Missing parameters");

            const apiService = new TrackService();
            const updatedTrack = await apiService.updateTrack(id, title, duration, artists, albums);

            response.status(201).json(updatedTrack);
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

    public async createTrackExecutor(request: Request<{},{},{title: string, duration: number, artists?: Artists[], albums?: Albums[]},{}>, response: Response) {
        const {title, artists, albums, duration} = request.body;

        try {
            if (!title || !duration) throw new Error("Missing parameters");

            const apiService = new TrackService();
            const track = await apiService.createTrack(title, duration, artists, albums);

            response.status(201).json(track);
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

    public async searchTracks(request: Request<{},{},{},{q: string}>, response: Response) {
        const query = request.query.q;

        try {
            if (!query) throw new Error("Missing query");

            const apiService = new TrackService();
            const tracks = await apiService.searchTracks(query);

            response.status(201).json(tracks);
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

    public async getAllTracksFromArtistExecutor(request: Request<{artistId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.artistId);

        try {
            if (!id) throw new Error("artistId is missing");

            const apiService = new TrackService();
            const tracks = await apiService.getAllTracksFromArtist(id);

            response.status(201).json(tracks);
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
}