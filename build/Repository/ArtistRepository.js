import prisma from "../Database/data-source.js";
export default class ArtistRepository {
    constructor() { }
    async getAllArtists(sortBy, sortDir) {
        const orderBy = {
            [sortBy]: sortDir.toLowerCase()
        };
        return prisma.artist.findMany({
            orderBy: orderBy
        });
    }
    async getAllArtistsPagination(sortBy, sortDir, limit, offset) {
        const orderBy = {
            [sortBy]: sortDir.toLowerCase()
        };
        const result = {};
        result.data = await prisma.artist.findMany({
            skip: offset,
            take: limit,
            orderBy: orderBy
        });
        result.metaData = {
            limit,
            offset,
            count: await prisma.artist.count()
        };
        return result;
    }
    async getSingleArtist(id) {
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
        });
    }
    async searchArtists(query) {
        return prisma.artist.findMany({
            where: {
                name: { contains: query }
            },
            orderBy: {
                name: "asc"
            }
        });
    }
    async deleteArtist(id) {
        await prisma.artist.delete({
            where: {
                id
            }
        });
    }
    async createArtist(name, image) {
        return prisma.artist.create({
            data: {
                name,
                image
            }
        });
    }
    async updateArtist(id, name, image) {
        return prisma.artist.update({
            data: {
                name,
                image
            },
            where: {
                id
            }
        });
    }
}
