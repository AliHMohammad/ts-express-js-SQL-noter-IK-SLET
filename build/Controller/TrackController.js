import TrackRepository from "../Repository/TrackRepository.js";
export default class TrackController {
    constructor() { }
    async getAllTracksExecutor(_request, response) {
        try {
            const repository = new TrackRepository();
            const tracks = await repository.getAllTracks();
            const result = tracks.map((track) => {
                return {
                    id: track.id,
                    title: track.title,
                    duration: track.duration,
                    artists: track.trackArtist.map((item) => {
                        return {
                            id: item.artist.id,
                            name: item.artist.name,
                            image: item.artist.image
                        };
                    }),
                    albums: track.trackAlbum.map((item) => {
                        return {
                            id: item.album.id,
                            title: item.album.title,
                            yearOfRelease: item.album.yearOfRelease,
                            image: item.album.image
                        };
                    })
                };
            });
            response.status(200).json(result);
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
    async getSingleTrackExecutor(request, response) {
        const id = parseInt(request.params.trackId);
        try {
            if (!id)
                throw new Error("Id is not a number");
            const repository = new TrackRepository();
            const track = await repository.getSingleTrack(id);
            const result = {
                id: track.id,
                title: track.title,
                duration: track.duration,
                artists: track.trackArtist.map((item) => {
                    return {
                        id: item.artist.id,
                        name: item.artist.name,
                        image: item.artist.image
                    };
                }),
                albums: track.trackAlbum.map((item) => {
                    return {
                        id: item.album.id,
                        title: item.album.title,
                        yearOfRelease: item.album.yearOfRelease,
                        image: item.album.image
                    };
                })
            };
            response.status(200).json(track);
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
    async searchTracksExecutor(request, response) {
    }
    async createTrackExecutor(request, response) {
    }
    async updateTrackExecutor(request, response) {
    }
    async deleteTrackExecutor(request, response) {
    }
}
