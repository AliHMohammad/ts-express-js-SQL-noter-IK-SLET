import { AppDataSource } from "../Database/data-source.js";
import { Artists } from "../Model/Artists.js";
const artistsRepository = AppDataSource.getRepository(Artists);
//GET
async function getAllArtists(request, response) {
    try {
        const artists = await artistsRepository.createQueryBuilder("artists").orderBy("name").getMany();
        if (artists.length === 0) {
            response.status(404).json({ message: "No Artists found" });
        }
        else {
            response.status(200).json(artists);
        }
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
}
//GET BY ID
async function getSingleArtist(request, response) {
    try {
        const id = Number(request.params.artistId);
        const artistFound = await artistsRepository.findOneByOrFail({ id: id });
        response.status(200).json(artistFound);
    }
    catch (error) {
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
async function deleteArtist(request, response) {
    try {
        const requestId = Number(request.params.artistId);
        //Sletter også på cascade, da dette er angivet i vores entitites og vores SQL backend (datagrip)
        const deleteResult = await artistsRepository.createQueryBuilder("artist").delete().where("id = :id", { id: requestId }).execute();
        console.log(deleteResult.affected);
        //1
        if (deleteResult.affected === 0) {
            response.status(404).json({ message: "Could not delete artist" });
        }
        else {
            response.status(204).json();
        }
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
}
//UPDATE
async function updateArtist(request, response) {
    const name = request.body.name;
    const image = request.body.image;
    try {
        if (!name || !image) {
            throw new Error("Request body is missing parameter");
        }
        const id = parseInt(request.params.artistId);
        const updateResult = await artistsRepository.createQueryBuilder("artist").update().set({ name, image }).where("id = :id", { id }).execute();
        if (updateResult.affected === 0) {
            response.status(404).json({ message: "Could not update artist" });
        }
        else {
            response.status(201).json();
        }
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
}
//CREATE
async function createArtist(request, response) {
    const { name, image } = request.body;
    try {
        if (!name || !image) {
            throw new Error("Missing parameters");
        }
        const newArtist = artistsRepository.create({
            name,
            image
        });
        await artistsRepository.save(newArtist);
        response.status(204).json({});
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//SEARCH MED QUERY
async function searchArtists(request, response) {
    //postman: localhost:3000/search?q=yourSearchTerm
    const q = request.query.q;
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
        }
        else {
            response.status(200).json(artists);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
export { getSingleArtist, getAllArtists, deleteArtist, updateArtist, searchArtists, createArtist };
