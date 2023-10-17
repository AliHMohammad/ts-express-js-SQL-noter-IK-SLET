import { Request, Response } from "express";




async function searchAll(request: Request<{}, {}, {}, { q: string }>, response: Response) {

    const q = request.query.q;

    
    try {
        
    } catch (error:any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}


export {searchAll}