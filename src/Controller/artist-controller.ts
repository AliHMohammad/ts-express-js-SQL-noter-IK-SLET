import { Request, Response } from "express";
import Debug from "debug";
import prisma from "../Database/data-source.js";



//GET
async function getAllArtists(request: Request<{}, {}, {}, {}>, response: Response) {
    try {
        const artists = await prisma.artists.findMany({
            orderBy: {
                name: "asc"
            }
        });

        if (artists.length === 0) {
            throw new Error("No artists found")
        }

        response.status(201).json(artists);
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//GET BY ID
async function getSingleArtist(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
    try {
        
    } catch (error: any) {
        switch (error.name) {
            case "EntityNotFoundError":
                response.status(404).json({ error: error.message });
                break;
            default:
                response.status(500).json({ error: error });
                break;
        }
    }
}

//DELETE
async function deleteArtist(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
    try {
        
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

//UPDATE
async function updateArtist(request: Request<{ artistId: string }, {}, { name: string; image: string }, {}>, response: Response) {
    const name = request.body.name;
    const image = request.body.image;

    try {
        
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

//CREATE
async function createArtist(request: Request<{}, {}, { name: string; image: string }, {}>, response: Response) {
    
    const { name, image } = request.body;

    try {
        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//SEARCH MED QUERY
async function searchArtists(request: Request<{}, {}, {}, { q: string }>, response: Response) {
    //postman: localhost:3000/search?q=yourSearchTerm

    const q = request.query.q;

    try {
        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export { getSingleArtist, getAllArtists, deleteArtist, updateArtist, searchArtists, createArtist };
