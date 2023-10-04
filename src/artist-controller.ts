import express, { Express, Request, Response } from "express";
import { connection } from "./connection.js";
import { OkPacketParams, RowDataPacket } from "mysql2";

//INTERFACE DER SKAL EXTENDE RowDataPacket
//Brug dette interface ifm. connection.execute(). Det vil give type annotering på din [results]
//Syntax: const [results, fields] = await connection.execute<InterfaceNavn[]>(query, values);
interface Artist extends RowDataPacket {
    name: string;
    image: string;
}

//GET
async function getAllArtists(request: Request, response: Response) {
    const query = /*sql*/ `SELECT * FROM artists`;

    try {
        //Results har type: Artist[]
        const [results] = await connection.execute<Artist[]>(query);

        if (results.length > 0) {
            response.status(200).json(results);
        } else {
            response.status(404).json({ message: "No artists found" });
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }

}

//GET BY ID
async function getSingleArtist(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
    try {
        const artistId = Number(request.params.artistId);
        const values = [artistId];
        const query = /*sql*/ `SELECT * FROM artists WHERE id = ?`;

        //Results har type: Artist[]
        const [results, fields] = await connection.execute<Artist[]>(query, values);

        if (results.length > 0) {
            const artist = results[0];
            response.status(200).json(artist);
        } else {
            response.status(404).json({ message: "Artist not found" });
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

//DELETE
async function deleteArtist(request: Request<{artistId: string}, {}, {}, {}>, response: Response) {
    
    try {
        const artistId = Number(request.params.artistId);
        console.log(artistId);
        
        const query = /*sql*/ `DELETE FROM artists WHERE id = ?`;
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

//UPDATE
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
        

        if (okPacket.affectedRows && okPacket.affectedRows > 0) {
            response.status(204).json({message: "Artist updated"})
        } else {
            response.status(404).json({ message: "Artist not found. No artist was updated" });
        }

    } catch (error: any) {

        response.status(500).json({ error: error.message });
    }
}

//SEARCH MED QUERY
async function searchArtists(request: Request<{}, {}, {}, {q: string}>, response: Response) {
    
    try {
        //postman: localhost:3000/search?q=yourSearchTerm
        const q = request.query.q;

        if (!q) {
            throw new Error("Query is missing");
        }

        const query = /*sql*/ `SELECT * FROM artists WHERE name LIKE ? ORDER BY name`;
        const values = [`%${q}%`];

        //Results har type: Artist[]
        const [results] = await connection.execute<Artist[]>(query, values);

        if (results.length > 0) {
            response.status(200).json(results);
        } else {
            response.status(404).json({ message: "No matching artists found" });
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}


export { getSingleArtist, getAllArtists, deleteArtist, updateArtist, searchArtists };