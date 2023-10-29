import {ILike, Repository} from "typeorm";
import {Tracks} from "../Model/Tracks.js";
import {AppDataSource} from "../Database/data-source.js";
import {Artists} from "../Model/Artists.js";
import {Albums} from "../Model/Albums.js";


export default class TrackRepository {
    private repository: Repository<Tracks>;
    constructor() {
        this.repository = AppDataSource.getRepository(Tracks);
    }

    public async getSingleTrack(id: number) {
        return await this.repository.findOneOrFail({
            relations: {
                artists: true,
                albums: true
            },
            where: {
                id: id
            },
            order: {
                artists: {
                    name: "ASC"
                },
                albums: {
                    title: "ASC"
                }
            }
        })
    }

    public async getAllTacks() {
        const tracks = await this.repository.find({
            relations: {
                artists: true,
                albums: true
            },
            order: {
                title: "ASC",
                artists: {
                    name: "ASC"
                },
                albums: {
                    title: "ASC"
                }
            }
        })

        if (!tracks.length){
            throw new Error("Could not find any tracks")
        }

        return tracks;
    }

    public async deleteTrack(id: number) {

        const deleteResult = await this.repository.createQueryBuilder("track")
            .delete()
            .where("id = :id", {id})
            .execute();

        if (!deleteResult.affected) throw new Error("Could not delete track with specified ID");
    }

    public async updateTrack(id: number, title: string, duration: number, artists: Artists[], albums?: Albums[]){

        const newTrack = new Tracks();
        newTrack.title = title;
        newTrack.duration = duration;

        const updateResult = await this.repository.createQueryBuilder("track")
            .update()
            .set(newTrack)
            .where("id = :id", {id})
            .execute();

        if (!updateResult.affected) throw new Error("Could not update track with specified ID");

        const updatedTrack = await this.repository.findOneOrFail({
            where: {
                id
            }
        });


        // If artists and/or albums is given, then create associations to them. Save again.
        artists ? updatedTrack.artists = artists : null;
        albums ? updatedTrack.albums = albums : null;

        return await this.repository.save(updatedTrack);
    }

    public async createTrack(title: string, duration: number, artists?: Artists[], albums?: Albums[]){

        const newTrack = new Tracks();
        newTrack.title = title;
        newTrack.duration = duration;
        newTrack.artists = artists || [];
        newTrack.albums = albums || [];

        return await this.repository.save(newTrack);
    }

    public async searchTracks(query: string){
        return await this.repository.find({
            relations: {
                artists: true,
                albums: true
            },
            where: {
                title: ILike(`%${query}%`)
            },
            order: {
                title: "ASC",
                artists: {
                    name: "ASC"
                },
                albums: {
                    title: "ASC"
                }
            }
        })
    }

    public async getAllTracksFromArtist(artistID: number) {
        const artistRepository = AppDataSource.getRepository(Artists)
        return await artistRepository.findOneOrFail({
            relations: {
                tracks: true
            },
            where: {
                id: artistID
            },
            order: {
                tracks: {
                    title: "ASC"
                }
            }
        })
    }
}