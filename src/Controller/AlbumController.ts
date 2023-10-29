import {Request, Response} from "express";
import AlbumRepository from "../Repository/AlbumRepository.js";


export default class AlbumController {
    constructor() {}

    public async getAllAlbumsExecutor(request: Request<{},{},{},{}>, response: Response) {
        try {
            const repository = new AlbumRepository();
            const albums = await repository.getAllAlbums();

            response.status(201).json(albums);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async getSingleAlbumExecutor(request: Request<{albumId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.albumId);

        try {
            if (!id) throw new Error("Id is not a number");

            const repository = new AlbumRepository();
            const album = await repository.getSingleAlbum(id);

            const result = {
                ...album,
                yearOfRelease: album.year_of_release,
                tracks: album.tracks.map((track) => {
                    return {
                        id: track.tracks.id,
                        title: track.tracks.title,
                        duration: track.tracks.duration,
                        artists: track.tracks.artists.map((artist) => {
                            return {
                                id: artist.artists.id,
                                name: artist.artists.name,
                                image: artist.artists.image
                            }
                        })
                    }
                }),
                artists: album.artists.map((artist) => {
                    return {
                        id: artist.artists.id,
                        name: artist.artists.name,
                        image: artist.artists.image
                    }
                })

            }

            response.status(201).json(result);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }
}