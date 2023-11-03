import { Request, Response } from "express";
import prisma from "../Database/data-source.js";
import { albums, artists } from "@prisma/client";


//GET SINGLE
async function getSingleTrack(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
    
    try {

        const id = parseInt(request.params.trackId);

        const track = await prisma.tracks.findFirstOrThrow({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                duration: true,
                artists: {
                    select: {artists: true}
                },
                
            }
        })

        const result = {
            ...track,
            artists: track.artists.map((artist) => {
                return {
                    ...artist.artists
                }
            })
        }

        response.status(201).json(result);

    } catch (error: any) {
        switch (error.name) {
            case "EntityNotFoundError":
                response.status(404).json({ error: error.message });
                break;
            default:
                response.status(500).json({ error: error.message });
                break;
        }
    }
}

//GET ALL
async function getAllTracks(request: Request<{}, {}, {}, {}>, response: Response) {
    
    try {

        const tracks = await prisma.tracks.findMany({
            include: {
                artists: {
                    select: {artists: true}
                }
            }
        })

        const result = tracks.map(track => {
            return {
                ...track,
                artists: track.artists.map((artist) => {
                    return {
                        ...artist.artists
                    }
                })
            }
        })

        response.status(201).json(result);
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//CREATE
async function createTrack(request: Request<{}, {}, { title: string, duration: string, artists: artists[], albums: albums[] }, {}>, response: Response) {
    
    const { title, artists, albums } = request.body;
    const duration = parseInt(request.body.duration);

    try {

        if (!title || !duration || !artists || albums) {
            throw new Error("Parameters missing");
        }

        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//DELETE 
async function deleteTrack(request: Request<{trackId : string}, {}, {}, {}>, response: Response) {

    const id = parseInt(request.params.trackId);

    try {
        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//UPDATE
async function updateTrack(request: Request<{ trackId: string }, {}, { title: string; duration: string; artists?: any[]; albums?: any[] }, {}>, response: Response) {
    const id = parseInt(request.params.trackId);

    try {
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//SEARCH
async function searchTracks(request: Request<{}, {}, {}, {q: string}>, response: Response) {
    
    const q = request.query.q;

    try {
        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}


export { getAllTracks, getSingleTrack, createTrack, deleteTrack, searchTracks, updateTrack };