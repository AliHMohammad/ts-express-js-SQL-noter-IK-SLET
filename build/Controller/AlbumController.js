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
    async deleteAlbumExecutor(request, response) {
        const id = parseInt(request.params.albumId);
        try {
            const apiService = new AlbumService();
            await apiService.deleteAlbum(id);
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
    async createAlbumExecutor(request, response) {
        const { title, image, artists, tracks } = request.body;
        const yearOfRelease = parseInt(request.body.yearOfRelease);
        try {
            if (!title || !image || !yearOfRelease) {
                throw new Error("Missing parameters");
            }
            const apiService = new AlbumService();
            const createdAlbum = await apiService.createAlbum(title, yearOfRelease, image, artists, tracks);
            response.status(201).json(createdAlbum);
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
    async updateAlbumExecutor(request, response) {
        const { title, image, artists, tracks } = request.body;
        const id = parseInt(request.params.albumId);
        const yearOfRelease = parseInt(request.body.yearOfRelease);
        try {
            if (!title || !image || !yearOfRelease) {
                throw new Error("Missing parameters");
            }
            const apiService = new AlbumService();
            const updateResult = await apiService.updateAlbum(id, title, yearOfRelease, image, artists, tracks);
            response.status(201).json(updateResult);
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
    async searchAlbumsExecutor(request, response) {
        const query = request.query.q;
        try {
            if (!query) {
                throw new Error("Query missing");
            }
            const apiService = new AlbumService();
            const albums = await apiService.searchAlbums(query);
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
}
