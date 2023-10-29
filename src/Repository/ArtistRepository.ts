import {ILike, Repository, UpdateResult} from "typeorm";
import { Artists } from "../Model/Artists.js";
import { AppDataSource } from "../Database/data-source.js";


export default class ArtistRepository {
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

    public async createArtist(name: string, image: string): Promise<void> {
        const artist = new Artists();
        artist.name = name;
        artist.image = image;

        await this.repository.save(artist);
    }

    public async deleteArtist(id: number): Promise<void> {
        const deleteResult = await this.repository.createQueryBuilder("artist").delete().where("id = :id", { id: id }).execute();

        if (deleteResult.affected === 0) {
            throw new Error("Could not delete artist with specified ID");
        }
    }

    public async updateArtist(id: number, name: string, image: string): Promise<UpdateResult> {

        const updateResult = await this.repository.createQueryBuilder("artists")
            .update()
            .set({
                name,
                image
            })
            .where("id = :id", {id})
            .execute();

        if (updateResult.affected === 0) {
            throw new Error("Could not update artist with specified ID");
        }

        return updateResult;
    }

    public async searchArtists(query: string) {

        const artists = await this.repository.find({
            where: {
                name: ILike(`%${query}%`)
            },
            order: {
                name: "ASC"
            }
        })

        /*Med QueryBuilder:*/

        // const artists: Artists[] = await this.repository
        //     .createQueryBuilder("artists")
        //     .where("name LIKE :search", {search: `%${query}%`})
        //     .orderBy({
        //         name: "ASC"
        //     })
        //     .getMany()

        return artists;
    }
}