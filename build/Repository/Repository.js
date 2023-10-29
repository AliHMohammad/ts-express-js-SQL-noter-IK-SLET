import prisma from "../Database/data-source.js";
export default class Repository {
    constructor() { }
    async getAllArtists() {
        return await prisma.artists.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }
}
