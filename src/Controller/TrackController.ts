import { Request, Response } from "express";
import { album, artist } from "@prisma/client";
import TrackRepository from "../Repository/TrackRepository.js";
import { it } from "node:test";
import {ResponseT} from "../Types/global";


export default class TrackController {
    constructor() {}
    //Lav en DTO-mappe
    //Data-transfer-object
    //const dto = tracks.map(track) => {}
    //response.json(dto)

    //UNDERSØG FUNCTION OVERLOADING

    public async getAllTracksExecutor(request: Request<{}, {}, {}, {pageNum: string, pageSize: string, sort: string, direction: string}>, response: Response) {
        const pageNum = parseInt(request.query.pageNum);
        const pageSize = parseInt(request.query.pageSize);
        const {sort, direction} = request.query;

        try {
            if (!sort || !direction) throw new Error("Missing sort and/or direction queries");

            const repository = new TrackRepository();
            let tracks;
            let result: ResponseT = {};

            if (pageNum && pageSize) {
                const offset = (pageNum - 1) * pageSize;
                tracks = await repository.getTracksOnSpecificPage(sort, direction, pageSize, offset);
                result.metaData = {
                    offset: offset,
                    limit: pageSize,
                    totalCount: tracks.totalCount
                }
            } else {
                tracks = await repository.getAllTracks(sort, direction);
            }

            const responseData = tracks.data.map((track) => {
                return {
                    id: track.id,
                    title: track.title,
                    duration: track.duration,
                    artists: track.trackArtist.map((item) => {
                        return {
                            id: item.artist.id,
                            name: item.artist.name,
                            image: item.artist.image,
                        };
                    }),
                    albums: track.trackAlbum.map((item) => {
                        return {
                            id: item.album.id,
                            title: item.album.title,
                            yearOfRelease: item.album.yearOfRelease,
                            image: item.album.image,
                        };
                    }),
                };
            })
            result.data = responseData;
            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async getSingleTrackExecutor(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
        const id = parseInt(request.params.trackId);

        try {
            if (!id) throw new Error("Id is not a number at singleTrackExecutor");

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
                        image: item.artist.image,
                    };
                }),
                albums: track.trackAlbum.map((item) => {
                    return {
                        id: item.album.id,
                        title: item.album.title,
                        yearOfRelease: item.album.yearOfRelease,
                        image: item.album.image,
                    };
                }),
            };

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async searchTracksExecutor(request: Request<{}, {}, {}, { q: string }>, response: Response) {
        const query = request.query.q;

        try {
            if (!query) throw new Error("Query is missing");

            const repository = new TrackRepository();
            const tracks = await repository.searchTracks(query);

            const result = tracks.map((track) => {
                return {
                    id: track.id,
                    title: track.title,
                    duration: track.duration,
                    artists: track.trackArtist.map((item) => {
                        return {
                            id: item.artist.id,
                            name: item.artist.name,
                            image: item.artist.image,
                        };
                    }),
                    albums: track.trackAlbum.map((item) => {
                        return {
                            id: item.album.id,
                            title: item.album.title,
                            yearOfRelease: item.album.yearOfRelease,
                            image: item.album.image,
                        };
                    }),
                };
            });

            response.status(201).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async createTrackExecutor(request: Request<{}, {}, { title: string; duration: number; artists: artist[]; albums: album[] }, {}>, response: Response) {
        const { title, duration, artists, albums } = request.body;

        try {
            if (!title || !duration || !artists || !albums) throw new Error("Parameters missing");
        
            const repository = new TrackRepository();
            const createdTrack = await repository.createTrack(title, duration, artists, albums);

            response.status(201).json(createdTrack);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async updateTrackExecutor(request: Request<{ trackId: string }, {}, { title: string; duration: number; artists: artist[]; albums: album[] }, {}>, response: Response) {
        const { title, duration, artists, albums } = request.body;
        const id = parseInt(request.params.trackId);
        
        try {
            if (!title || !duration || !artists || !albums) throw new Error("Parameters missing");
            if (!id) throw new Error("Id is not a number at UpdateTrack");

            const repository = new TrackRepository();
            await repository.updateTrack(id, title, duration, artists, albums);

            response.status(204).json();
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }

    public async deleteTrackExecutor(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
        const id = parseInt(request.params.trackId);

        try {
            if (!id) throw new Error("Id is not a number at DeleteTrack");

            const repository = new TrackRepository();
            await repository.deleteTrack(id);

            response.status(204).json()
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }
}
