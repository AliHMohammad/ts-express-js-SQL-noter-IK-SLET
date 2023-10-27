import { Artists } from "../Model/Artists.js";
import { AppDataSource } from "../../Database/data-source.js";
export default class ArtistService {
    repository;
    constructor() {
        this.repository = AppDataSource.getRepository(Artists);
    }
    async getAllArtists() {
        const artists = await this.repository.find({
            order: {
                name: "ASC",
            },
        });
        if (!artists.length) {
            throw new Error("No artists found");
        }
        return artists;
    }
    async getSingleArtist(id) {
        return await this.repository.findOneByOrFail({
            id
        });
    }
    async createArtist(name, image) {
        const newArtist = this.repository.create({
            name,
            image,
        });
        await this.repository.save(newArtist);
    }
}
