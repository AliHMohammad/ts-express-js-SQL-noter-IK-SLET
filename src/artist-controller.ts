import express, { Express, Request, Response } from "express";
import { connection } from "./connection.js";
import { OkPacketParams } from "mysql2";


async function getAllArtists(request: Request, response: Response) {
    const query = "SELECT * FROM artists";

    try {
        const [results] = await connection.execute(query);

        if (Array.isArray(results) && results.length > 0) {
            response.status(200).json(results);
        } else {
            response.status(404).json({message: "No artists found"})
        }

    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }

}

async function getSingleArtist(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
    try {
        const artistId = Number(request.params.artistId);
        const values = [artistId];
        const query = "SELECT * FROM artists WHERE id = ?";

        const [results, fields] = await connection.execute(query, values);

        if (Array.isArray(results) && results.length > 0) {
            const artist = results[0];
            response.status(200).json(artist);
        } else {
            response.status(404).json({ message: "Artist not found" });
        }

    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

async function deleteArtist(request: Request<{artistId: string}, {}, {}, {}>, response: Response) {
    
    try {
        const artistId = Number(request.params.artistId);
        console.log(artistId);
        
        const query = "DELETE FROM artists WHERE id = ?"
        const values = [artistId];

        const [results, fields] = await connection.execute(query, values);

        const okPacket = results as OkPacketParams
 
        if (okPacket.affectedRows) {
            response.status(204).json({message: "Artist deleted"})
        } else {
            response.status(404).json({ message: "Artist not found. No artist was deleted" });
        }

    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

async function updateArtist(request: Request<{artistId: string}, {}, {name: string, image: string}, {}>, response: Response) {
    
    try {
        const artistId = Number(request.params.artistId);
        const { name, image } = request.body;

        if (!name || !image) {
            throw new Error("Name or image is empty")
        }

        const values = [name, image, artistId];
        const query = /*sql*/ `UPDATE artists SET name = ?, image = ? WHERE id = ?`

        const [results, fields] = await connection.execute(query, values)

        const okPacket = results as OkPacketParams;
        console.log(okPacket);
        

        if (okPacket.affectedRows && okPacket.affectedRows > 0) {
            response.status(204).json({message: "Artist updated"})
        } else {
            response.status(404).json({ message: "Artist not found. No artist was updated" });
        }

    } catch (error: any) {

        response.status(500).json({ error: error.message });
    }
}

async function searchArtists(request: Request<{}, {}, {}, {q: string}>, response: Response) {
    
    try {
        //postman: localhost:3000/search?q=yourSearchTerm
        const q = request.query.q;

        if (!q) {
            throw new Error("Query is missing")
        }
        
        const query = /*sql*/ `SELECT * FROM artists WHERE name LIKE ? ORDER BY name`;
        const values = [`%${q}%`];

        const [results] = await connection.execute(query, values);

        if (Array.isArray(results) && results.length > 0) {
            response.status(200).json(results);
        } else {
            response.status(404).json({ message: "No matching artists found" });
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}


export { getSingleArtist, getAllArtists, deleteArtist, updateArtist, searchArtists };