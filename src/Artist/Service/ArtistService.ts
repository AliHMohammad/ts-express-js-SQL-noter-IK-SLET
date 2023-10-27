import { Repository } from "typeorm";
import { Artists } from "../Model/Artists.js";
import { AppDataSource } from "../../Database/data-source.js";


export default class ArtistService {
    private repository: Repository<Artists>;
    constructor() {
        this.repository = AppDataSource.getRepository(Artists);
    }

    public async getAllArtists(): Promise<Artists[]> {
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

    public async getSingleArtist(id: number): Promise<Artists> {
        return await this.repository.findOneByOrFail({
            id
        })
    }

    public async createArtist(name: string, image: string) {
        const newArtist = this.repository.create({
            name,
            image,
        });

        await this.repository.save(newArtist);
    }
}