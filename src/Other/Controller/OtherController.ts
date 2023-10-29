import {query, Request, Response} from "express";
import {Tracks} from "../../Track/Model/Tracks.js";
import {Albums} from "../../Album/Model/Albums.js";
import {Artists} from "../../Artist/Model/Artists.js";
import OtherService from "../Service/OtherService.js";



export default class OtherController {

    constructor() {};

    public async searchAllExecutor(request: Request<{},{},{},{q: string}>, response: Response){
        type Result = {
            tracks?: Tracks[];
            albums?: Albums[];
            artists?: Artists[];
        };

        const query = request.query.q;

        try {
            if (!query) throw new Error("Query is missing");

            const apiService = new OtherService();
            const result: Result = await apiService.searchAll(query);

            response.status(201).json(result);
        } catch (error: any) {
            switch (error.name) {
                case "EntityNotFoundError":
                    response.status(404).json({ error: error.message });
                    break;
                case "Error":
                    response.status(400).json({ error: error.message });
                    break;
                default:
                    response.status(500).json({ error: error });
                    break;
            }
        }
    }
}