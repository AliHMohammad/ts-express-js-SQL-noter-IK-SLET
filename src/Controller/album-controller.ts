import { Request, Response } from "express";

//GET SINGLE
async function getSingleAlbum(request: Request<{ albumId: string }, {}, {}, {}>, response: Response) {
    //Get all information from album by ID
    try {
        
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
async function getAllAlbums(request: Request<{}, {}, {}, {}>, response: Response) {
    //Get all information from albums
    try {
        
    } catch (error: any) {
        response.status(500).json({ error: error });
    }
}


//DELETE
async function deleteAlbum(request: Request<{ albumId: string }, {}, {}, {}>, response: Response) {
    const id = parseInt(request.params.albumId);

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
async function updateAlbum(request: Request<{ albumId: string }, {}, { title: string; yearOfRelease: string; image: string; artists?: any[]; tracks?: any[] }, {}>, response: Response) {

    const id = parseInt(request.params.albumId);

    const { title, image, artists, tracks } = request.body;
    const yearOfRelease = parseInt(request.body.yearOfRelease);

    try {
        
       
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//CREATE
async function createAlbum(request: Request<{}, {}, { title: string, yearOfRelease: string, image: string;  artists: any[], tracks: any[]}, {}>, response: Response) {
    //Den her er i stand til at oprette helt nye sange, der ikke i forvejen eksisterer i databasen - dog med artister, der allerede eksisterer.
    const { title, image, artists, tracks } = request.body;
    const yearOfRelease = parseInt(request.body.yearOfRelease);

    try {
        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//SEARCH
async function searchAlbums(request: Request<{}, {}, {}, { q: string }>, response: Response) {

    const query = request.query.q;

    try {
        

    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export { getAllAlbums, getSingleAlbum, deleteAlbum, createAlbum, searchAlbums, updateAlbum};
