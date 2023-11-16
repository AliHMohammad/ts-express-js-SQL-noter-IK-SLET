import prisma from "../Database/data-source.js";
import {artist} from "@prisma/client";

interface IMetaData {
    offset: number,
    limit: number,
    count: number
}

interface IPaginationResult<T> {
    data?: T[],
    metaData?: IMetaData
}

export default class ArtistRepository {
    constructor() {}

    public async getAllArtists(sortBy: string, sortDir: string) {
        const orderBy = {
            [sortBy]: sortDir.toLowerCase()
        }

        return prisma.artist.findMany({
            orderBy: orderBy
        });
    }

    public async getAllArtistsPagination(sortBy: string, sortDir: string, limit: number, offset: number ) {
        const orderBy = {
            [sortBy]: sortDir.toLowerCase()
        }

        const result: IPaginationResult<artist> = {};

        result.data = await prisma.artist.findMany({
            skip: offset,
            take: limit,
            orderBy: orderBy
        })

        result.metaData = {
            limit,
            offset,
            count: await prisma.artist.count()
        }

        return result;
    }

    public async getSingleArtist(id: number) {
        return prisma.artist.findFirstOrThrow({
            include: {
                artistTrack: {
                    include: {
                        track: true
                    }
                }
            },
            where: {
                id
            }
        })
    }

    public async searchArtists(query: string) {
        return prisma.artist.findMany({
            where: {
                name: {contains: query}
            },
            orderBy: {
                name: "asc"
            }
        })
    }

    public async deleteArtist(id: number){
        await prisma.artist.delete({
            where: {
                id
            }
        })
    }

    public async createArtist(name: string, image: string) {
        return prisma.artist.create({
            data: {
                name,
                image
            }
        })
    }

    public async updateArtist(id: number, name: string, image: string) {
        return prisma.artist.update({
            data: {
                name,
                image
            },
            where: {
                id
            }
        })
    }
}