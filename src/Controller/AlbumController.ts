import {Request, Response} from "express";
import AlbumRepository from "../Repository/AlbumRepository.js";



export default class AlbumController {
    constructor() {}

    public async getAllAlbumsExecutor(request: Request<{},{},{},{}>, response: Response) {
        try {
            const repository = new AlbumRepository();
            const albums = await repository.getAllAlbums();

            const result = albums.map((album) => {
                return {
                    ...album,
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
            })

            response.status(201).json(result);
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

    public async searchAlbumsExecutor(request: Request<{},{},{},{q: string}>, response: Response) {
        const query = request.query.q;

        try {
            if (!query) throw new Error("Query is missing");

            const repository = new AlbumRepository();
            const albums = await repository.searchAlbums(query);

            const result = albums.map((album) => {
                return {
                    ...album,
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
            })

            response.status(201).json(result);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async deleteAlbumExecutor(request: Request<{albumId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.albumId);

        try {
            if (!id) throw new Error("Id is not a number");

            const repository = new AlbumRepository()
            await repository.deleteAlbum(id);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }
}