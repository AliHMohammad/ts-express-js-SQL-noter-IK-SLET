import { Request, Response } from "express";


//GET SINGLE
async function getSingleTrack(request: Request<{ trackId: string }, {}, {}, {}>, response: Response) {
    
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
async function getAllTracks(request: Request<{}, {}, {}, {}>, response: Response) {
    
    try {
        
        
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//CREATE
async function createTrack(request: Request<{}, {}, { title: string, duration: string, artists: any[], albums: any[] }, {}>, response: Response) {
    
    try {
        
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