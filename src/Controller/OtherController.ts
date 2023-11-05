import { Request, Response } from "express";
import OtherRepository from "../Repository/OtherRepository.js";


export default class OtherController {
    constructor() { };

    public async searchAllExecutor(request: Request<{},{},{},{q: string}>, response: Response) {
        const query = request.query.q;

        try {
            if (!query) throw new Error("Query missing");
            
            const repository = new OtherRepository()
            const searchResult = await repository.searchAll(query);

            response.status(200).json(searchResult);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ error: error.message });
            } else {
                response.status(500).json({ error: error.message });
            }
        }
    }
}