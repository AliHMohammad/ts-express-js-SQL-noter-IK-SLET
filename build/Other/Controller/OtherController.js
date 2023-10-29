import OtherService from "../Service/OtherService.js";
export default class OtherController {
    constructor() { }
    ;
    async searchAllExecutor(request, response) {
        const query = request.query.q;
        try {
            if (!query)
                throw new Error("Query is missing");
            const apiService = new OtherService();
            const result = await apiService.searchAll(query);
            response.status(201).json(result);
        }
        catch (error) {
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
