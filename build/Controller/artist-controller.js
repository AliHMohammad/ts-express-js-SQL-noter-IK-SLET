import prisma from "../Database/data-source.js";
//GET
async function getAllArtists(request, response) {
    try {
        const artists = await prisma.artists.findMany({
            orderBy: {
                name: "asc"
            }
        });
        if (artists.length === 0) {
            throw new Error("No artists found");
        }
        response.status(201).json(artists);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
//GET BY ID
async function getSingleArtist(request, response) {
    try {
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
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
}
//CREATE
async function createArtist(request, response) {
    const { name, image } = request.body;
    try {
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
