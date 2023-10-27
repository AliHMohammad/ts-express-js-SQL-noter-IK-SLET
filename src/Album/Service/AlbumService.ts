import {Repository} from "typeorm";
import {Albums} from "../Model/Albums.js";
import {AppDataSource} from "../../Database/data-source.js";


export default class AlbumService {
    private repository: Repository<Albums>;
    constructor() {
        this.repository = AppDataSource.getRepository(Albums);
    }

    public async getAllAlbums(): Promise<Albums[]>{
        const albums = await this.repository.find({
            order: {
                title: "ASC"
            }
        });

        if (!albums.length){
            throw new Error("No albums found");
        }

        return albums;
    }

    public async getSingleAlbum(id: number): Promise<Albums> {
        return await this.repository.findOneByOrFail({
            id: id
        });
    }

    public async createAlbum(title: string, yearOfRelease: number, image: string){

    }

    public async updateAlbum(id: number, title: string, yearOfRelease: number, image: string) {

    }

    public async deleteAlbum(id: number){

    }

    public async searchAlbums(query: string){

    }
}