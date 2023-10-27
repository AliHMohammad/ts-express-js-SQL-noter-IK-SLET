import { Request, Response } from "express";
import { AppDataSource } from "../Database/data-source.js";
import { Artists } from "../Artist/Model/Artists.js";
import Debug from "debug";

const artistsRepository = AppDataSource.getRepository(Artists);

//GET
async function getAllArtists(request: Request<{}, {}, {}, {}>, response: Response) {
    try {
        //? 2 måder at gøre det på. Enten med createQueryBuilder(), som er mere SQL agtigt, ELLER uden.
        // const artists = await artistsRepository.createQueryBuilder("artists").orderBy("name").getMany();
        const artists = await artistsRepository.find({
            order: {
                name: "ASC",
            },
        });

        if (artists.length === 0) {
            response.status(404).json({ message: "No Artists found" });
        } else {
            response.status(200).json(artists);
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

//GET BY ID
async function getSingleArtist(request: Request<{ artistId: string }, {}, {}, {}>, response: Response) {
    try {
        const id = Number(request.params.artistId);
        const artistFound = await artistsRepository.findOneByOrFail({ id: id });

        response.status(200).json(artistFound);
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
        const requestId = Number(request.params.artistId);

        //Sletter også på cascade, da dette er angivet i vores entitites og vores SQL backend (datagrip)
        const deleteResult = await artistsRepository.createQueryBuilder("artist").delete().where("id = :id", { id: requestId }).execute();

        console.log(deleteResult.affected);
        //1

        if (deleteResult.affected === 0) {
            response.status(404).json({ message: "Could not delete artist" });
        } else {
            response.status(204).json();
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

//UPDATE
async function updateArtist(request: Request<{ artistId: string }, {}, { name: string; image: string }, {}>, response: Response) {
    const name = request.body.name;
    const image = request.body.image;

    try {
        if (!name || !image) {
            throw new Error("Request body is missing parameter");
        }

        const id = parseInt(request.params.artistId);
        //? Alternativt kan den gøres med create() og derefter save(). Dog skal du huske at smide id'et med.
        const updateResult = await artistsRepository.createQueryBuilder("artist").update().set({ name, image }).where("id = :id", { id }).execute();

        if (updateResult.affected === 0) {
            response.status(404).json({ message: "Could not update artist" });
        } else {
            response.status(201).json();
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
}

//CREATE
async function createArtist(request: Request<{}, {}, { name: string; image: string }, {}>, response: Response) {
    const { name, image } = request.body;

    try {
        if (!name || !image) {
            throw new Error("Missing parameters");
        }

        const newArtist = artistsRepository.create({
            name,
            image,
        });

        await artistsRepository.save(newArtist);

        response.status(204).json({});
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//SEARCH MED QUERY
async function searchArtists(request: Request<{}, {}, {}, { q: string }>, response: Response) {
    //postman: localhost:3000/search?q=yourSearchTerm

    const q = request.query.q;
    console.log(q);
    try {
        if (!q) {
            throw new Error("Query is missing");
        }

        const artists = await artistsRepository
            .createQueryBuilder("artists")
            .where("name LIKE :searchTerm", { searchTerm: `%${q}%` })
            .orderBy("name")
            .getMany();

        if (artists.length === 0) {
            response.status(404).json({ message: "No artists found" });
        } else {
            response.status(200).json(artists);
        }
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export { getSingleArtist, getAllArtists, deleteArtist, updateArtist, searchArtists, createArtist };
