import {Repository} from "typeorm";
import {Albums} from "../../Album/Model/Albums.js";
import {Tracks} from "../../Track/Model/Tracks.js";
import {Artists} from "../../Artist/Model/Artists.js";
import ArtistService from "../../Artist/Service/ArtistService.js";
import TrackService from "../../Track/Service/TrackService.js";
import AlbumService from "../../Album/Service/AlbumService.js";


export default class OtherService {

    constructor() {}

    public async searchAll(query: string) {
        const apiArtists = new ArtistService()
        const apiTracks = new TrackService();
        const apiAlbums = new AlbumService()

        const result: {artists?: Artists[], albums?: Albums[], tracks?: Tracks[]}= {};

        result.albums = await apiAlbums.searchAlbums(query);
        result.tracks = await apiTracks.searchTracks(query);
        result.artists = await apiArtists.searchArtists(query);

        return result;
    }

}