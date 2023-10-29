import ArtistService from "../../Artist/Service/ArtistService.js";
import TrackService from "../../Track/Service/TrackService.js";
import AlbumService from "../../Album/Service/AlbumService.js";
export default class OtherService {
    constructor() { }
    async searchAll(query) {
        const apiArtists = new ArtistService();
        const apiTracks = new TrackService();
        const apiAlbums = new AlbumService();
        const result = {};
        result.albums = await apiAlbums.searchAlbums(query);
        result.tracks = await apiTracks.searchTracks(query);
        result.artists = await apiArtists.searchArtists(query);
        return result;
    }
}
