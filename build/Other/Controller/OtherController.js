import ArtistService from "../../Artist/Service/ArtistService.js";
import TrackService from "../../Track/Service/TrackService.js";
import AlbumService from "../../Album/Service/AlbumService.js";
export default class OtherController {
    constructor() { }
    ;
    async searchAllExecutor(request, response) {
        const query = request.query.q;
        try {
            if (!query)
                throw new Error("Query is missing");
            const apiArtists = new ArtistService();
            const apiTracks = new TrackService();
            const apiAlbums = new AlbumService();
            const result = {
                tracks: [],
                albums: [],
                artists: []
            };
            result.albums = await apiAlbums.searchAlbums(query);
            result.tracks = await apiTracks.searchTracks(query);
            result.artists = await apiArtists.searchArtists(query);
            response.status(201).json(result);
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
