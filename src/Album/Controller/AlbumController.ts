import {Request, Response} from "express";
import AlbumService from "../Service/AlbumService.js";
import {Artists} from "../../Artist/Model/Artists";
import {Albums} from "../Model/Albums";
import {Tracks} from "../../Model/Tracks";

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

    public async deleteAlbumExecutor(request: Request<{albumId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.albumId);

        try {
            const apiService = new AlbumService();
            await apiService.deleteAlbum(id);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }


    }

    public async createAlbumExecutor(request: Request<{},{},{title: string, yearOfRelease: string, image: string, artists: Artists[], tracks: Tracks[]},{}>, response: Response){
        const {title, image, artists,tracks } = request.body;
        const yearOfRelease = parseInt(request.body.yearOfRelease);

        try {
            if (!title || !image || !yearOfRelease){
                throw new Error("Missing parameters");
            }

            const apiService = new AlbumService();
            const createdAlbum = await apiService.createAlbum(title, yearOfRelease, image, artists, tracks);

            response.status(201).json(createdAlbum);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async updateAlbumExecutor(request: Request<{albumId: string},{},{title: string, yearOfRelease: string, image: string, artists: Artists[], tracks: Tracks[]},{}>, response: Response){
        const {title, image, artists, tracks} = request.body;
        const id = parseInt(request.params.albumId)
        const yearOfRelease = parseInt(request.body.yearOfRelease);


        try {
            if (!title || !image || !yearOfRelease){
                throw new Error("Missing parameters");
            }

            const apiService = new AlbumService();
            const updateResult = await apiService.updateAlbum(id, title, yearOfRelease, image, artists, tracks);

            response.status(201).json(updateResult);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async searchAlbumsExecutor(request: Request<{},{},{},{q: string}>, response: Response){
        const query = request.query.q;
        try {
            if (!query) {
                throw new Error("Query missing");
            }

            const apiService = new AlbumService();
            const albums = await apiService.searchAlbums(query);

            response.status(201).json(albums);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

}