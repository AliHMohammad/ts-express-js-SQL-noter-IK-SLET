import {Request, Response} from "express";
import AlbumService from "../Service/AlbumService.js";

export default class AlbumController {
    constructor(){};

    public async getAllAlbumsExecutor(request: Request<{},{},{},{}>, response: Response){
        try {
            const apiService = new AlbumService();
            const albums = await apiService.getAllAlbums();

            response.status(201).json(albums);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async getSingleAlbumExecutor(request: Request<{albumId: string},{},{},{}>, response: Response){
        const id = parseInt(request.params.albumId);

        try {
            if (!id){
                throw new Error("Id is not a number");
            }
            const apiService = new AlbumService();
            const album = await apiService.getSingleAlbum(id);

            response.status(201).json(album);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }
}