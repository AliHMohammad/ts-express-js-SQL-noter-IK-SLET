import {query, Request, Response} from "express";
import {Tracks} from "../Model/Tracks.js";
import {Albums} from "../Model/Albums.js";
import {Artists} from "../Model/Artists.js";
import ArtistRepository from "../Repository/ArtistRepository.js";
import TrackRepository from "../Repository/TrackRepository.js";
import AlbumRepository from "../Repository/AlbumRepository.js";



export default class OtherController {

    constructor() {};

    public async searchAllExecutor(request: Request<{},{},{},{q: string}>, response: Response){
        type Result = {
            tracks: Tracks[];
            albums: Albums[];
            artists: Artists[];
        };

        const query = request.query.q;

        try {
            if (!query) throw new Error("Query is missing");

            const artistRepository = new ArtistRepository()
            const trackRepository = new TrackRepository();
            const albumRepository = new AlbumRepository()

            const result: Result = {
                tracks: [],
                albums: [],
                artists: []
            }

            result.albums = await albumRepository.searchAlbums(query);
            result.tracks = await trackRepository.searchTracks(query);
            result.artists = await artistRepository.searchArtists(query);

            response.status(201).json(result);
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