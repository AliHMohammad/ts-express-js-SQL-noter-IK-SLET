import {Request, Response} from "express";
import AlbumRepository from "../Repository/AlbumRepository.js";
import {Artist, Track} from "../Types/global";




export default class AlbumController {
    constructor() {}

    public async getAllAlbumsExecutor(request: Request<{},{},{},{}>, response: Response) {
        try {
            const repository = new AlbumRepository();
            const albums = await repository.getAllAlbums();

            const result = albums.map((album) => {
                return {
                    id: album.id,
                    title: album.title,
                    yearOfRelease: album.yearOfRelease,
                    image: album.image,
                    tracks: album.albumTrack.map((item) => {
                        return {
                            id: item.track.id,
                            title: item.track.title,
                            duration: item.track.duration,
                            artists: item.track.trackArtist.map((trackArtistItem) => {
                                return {
                                    id: trackArtistItem.artist.id,
                                    name: trackArtistItem.artist.name,
                                    image: trackArtistItem.artist.image
                                }
                            })
                        }
                    }),
                    artists: album.albumArtist.map((item) => {
                        return {
                            id: item.artist.id,
                            name: item.artist.name,
                            image: item.artist.image
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
                id: album.id,
                title: album.title,
                image: album.image,
                yearOfRelease: album.yearOfRelease,
                artists: album.albumArtist.map((item) => {
                    return {
                        id: item.artist.id,
                        name: item.artist.name,
                        image: item.artist.image
                    }
                }),
                tracks: album.albumTrack.map((item) => {
                    return {
                        id: item.track.id,
                        title: item.track.title,
                        duration: item.track.duration,
                        artists: item.track.trackArtist.map((trackArtistItem) => {
                            return {
                                id: trackArtistItem.artist.id,
                                name: trackArtistItem.artist.name,
                                image: trackArtistItem.artist.image
                            }
                        })
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
                    id: album.id,
                    title: album.title,
                    yearOfRelease: album.yearOfRelease,
                    image: album.image,
                    tracks: album.albumTrack.map((item) => {
                        return {
                            id: item.track.id,
                            title: item.track.title,
                            duration: item.track.duration,
                            artists: item.track.trackArtist.map((trackArtistItem) => {
                                return {
                                    id: trackArtistItem.artist.id,
                                    name: trackArtistItem.artist.name,
                                    image: trackArtistItem.artist.image
                                }
                            })
                        }
                    }),
                    artists: album.albumArtist.map((item) => {
                        return {
                            id: item.artist.id,
                            name: item.artist.name,
                            image: item.artist.image
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

    public async createAlbumExecutor(request: Request<{},{},{title: string, image: string, yearOfRelease: number, artists: Artist[], tracks: Track[]},{}>, response: Response) {
        const {title, image, yearOfRelease, artists, tracks} = request.body;

        try {
            if (!title || !image || !yearOfRelease || !artists || !tracks) throw new Error("Missing parameters");

            const repository = new AlbumRepository();
            await repository.createAlbum(title, yearOfRelease, image, artists, tracks);

            response.status(204).json();
        } catch (error: any) {
            console.log(error)
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async updateAlbumExecutor(request: Request<{albumId: number},{},{title: string, image: string, yearOfRelease: number, artists: Artist[], tracks: Track[]},{}>, response: Response){
        
    }


}


