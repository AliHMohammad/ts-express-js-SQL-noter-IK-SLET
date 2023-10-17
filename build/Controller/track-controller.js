import prisma from "../Database/data-source.js";
//GET SINGLE
async function getSingleTrack(request, response) {
    try {
    }
    catch (error) {
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
async function getAllTracks(request, response) {
    try {
        const tracks = await prisma.tracks.findMany({
            include: {
                artists_tracks: true
            },
            orderBy: {
                title: "asc"
            }
        });
        response.status(201).json({ tracks });
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
//CREATE
async function createTrack(request, response) {
    try {
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
//DELETE 
async function deleteTrack(request, response) {
    const id = parseInt(request.params.trackId);
    try {
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
//UPDATE
async function updateTrack(request, response) {
    const id = parseInt(request.params.trackId);
    try {
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
//SEARCH
async function searchTracks(request, response) {
    const q = request.query.q;
    try {
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
export { getAllTracks, getSingleTrack, createTrack, deleteTrack, searchTracks, updateTrack };
