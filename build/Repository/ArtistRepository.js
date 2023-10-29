import { ILike } from "typeorm";
import { Artists } from "../Model/Artists.js";
import { AppDataSource } from "../Database/data-source.js";
export default class ArtistRepository {
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
        const artist = new Artists();
        artist.name = name;
        artist.image = image;
        await this.repository.save(artist);
    }
    async deleteArtist(id) {
        const deleteResult = await this.repository.createQueryBuilder("artist").delete().where("id = :id", { id: id }).execute();
        if (deleteResult.affected === 0) {
            throw new Error("Could not delete artist with specified ID");
        }
    }
    async updateArtist(id, name, image) {
        const updateResult = await this.repository.createQueryBuilder("artists")
            .update()
            .set({
            name,
            image
        })
            .where("id = :id", { id })
            .execute();
        if (updateResult.affected === 0) {
            throw new Error("Could not update artist with specified ID");
        }
        return updateResult;
    }
    async searchArtists(query) {
        const artists = await this.repository.find({
            where: {
                name: ILike(`%${query}%`)
            },
            order: {
                name: "ASC"
            }
        });
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
