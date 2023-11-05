import {Request, Response} from "express";
import {album, artist} from "@prisma/client";
import TrackRepository from "../Repository/TrackRepository.js";
import {it} from "node:test";


export default class TrackController {
    constructor() {}

    public async getAllTracksExecutor(_request: Request<{},{},{},{}>, response: Response) {
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
                        }
                    }),
                    albums: track.trackAlbum.map((item) => {
                        return {
                            id: item.album.id,
                            title: item.album.title,
                            yearOfRelease: item.album.yearOfRelease,
                            image: item.album.image
                        }
                    })
                }
            })

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async getSingleTrackExecutor(request: Request<{trackId: string},{},{},{}>, response: Response) {
        const id = parseInt(request.params.trackId);

        try {
            if (!id) throw new Error("Id is not a number");

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
                    }
                }),
                albums: track.trackAlbum.map((item) => {
                    return {
                        id: item.album.id,
                        title: item.album.title,
                        yearOfRelease: item.album.yearOfRelease,
                        image: item.album.image
                    }
                })
            }

            response.status(200).json(track);
        } catch (error: any) {
            if (error instanceof Error){
                response.status(404).json({error: error.message});
            } else {
                response.status(500).json({error: error.message});
            }
        }
    }

    public async searchTracksExecutor(request: Request<{},{},{},{q: string}>, response: Response) {

    }

    public async createTrackExecutor(request: Request<{},{title: string, duration: number, artists: artist[], albums: album[]},{},{}>, response: Response) {

    }

    public async updateTrackExecutor(request: Request<{trackId: string},{title: string, duration: number, artists: artist[], albums: album[]},{},{}>, response: Response) {

    }

    public async deleteTrackExecutor(request: Request<{trackId: string},{},{},{}>, response: Response) {

    }
}
