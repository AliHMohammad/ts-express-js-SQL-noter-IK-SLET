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
        const artist = await prisma.artists.findFirstOrThrow({
            where: {
                id: parseInt(request.params.artistId)
            }
        });
        response.status(201).json(artist);
    }
    catch (error) {
        switch (error.name) {
            case "EntityNotFoundError":
                response.status(404).json({ error: error.message });
                break;
            case "NotFoundError":
                response.status(404).json({ prismaError: error.message });
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
        const id = parseInt(request.params.artistId);
        if (!name || !image) {
            throw new Error("Missing parameters");
        }
        const updatedArtist = await prisma.artists.update({
            where: {
                id: id
            },
            data: {
                name,
                image
            }
        });
        response.status(201).json(updatedArtist);
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
}
//CREATE
async function createArtist(request, response) {
    const { name, image } = request.body;
    try {
        const createdArtist = await prisma.artists.create({
            data: {
                name,
                image
            }
        });
        //Returnerer id'et på det nyoprettet artist
        response.status(200).json(createdArtist.id);
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
        const artists = await prisma.artists.findMany({
            where: {
                name: {
                    contains: q
                }
            },
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
export { getSingleArtist, getAllArtists, deleteArtist, updateArtist, searchArtists, createArtist };
