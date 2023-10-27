import { Albums } from "../Model/Albums.js";
import { AppDataSource } from "../../Database/data-source.js";
export default class AlbumService {
    repository;
    constructor() {
        this.repository = AppDataSource.getRepository(Albums);
    }
    async getAllAlbums() {
        const albums = await this.repository.find({
            order: {
                title: "ASC"
            }
        });
        if (!albums.length) {
            throw new Error("No albums found");
        }
        return albums;
    }
    async getSingleAlbum(id) {
        return await this.repository.findOneByOrFail({
            id: id
        });
    }
    async createAlbum(title, yearOfRelease, image) {
    }
    async updateAlbum(id, title, yearOfRelease, image) {
    }
    async deleteAlbum(id) {
    }
    async searchAlbums(query) {
    }
}
