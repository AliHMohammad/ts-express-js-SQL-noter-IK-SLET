import AlbumService from "../Service/AlbumService.js";
export default class AlbumController {
    constructor() { }
    ;
    async getAllAlbumsExecutor(request, response) {
        try {
            const apiService = new AlbumService();
            const albums = await apiService.getAllAlbums();
            response.status(201).json(albums);
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
    async getSingleAlbumExecutor(request, response) {
        const id = parseInt(request.params.albumId);
        try {
            if (!id) {
                throw new Error("Id is not a number");
            }
            const apiService = new AlbumService();
            const album = await apiService.getSingleAlbum(id);
            response.status(201).json(album);
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
