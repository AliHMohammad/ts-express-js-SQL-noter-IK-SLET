import prisma from "../Database/data-source.js";
export default class ArtistRepository {
    constructor() { }
    async getAllArtists() {
        return prisma.artists.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }
    async getSingleArtist(id) {
        return prisma.artists.findFirstOrThrow({
            include: {
                tracks: {
                    include: {
                        tracks: true
                    }
                }
            },
            where: {
                id
            }
        });
    }
    async searchArtists(query) {
        return prisma.artists.findMany({
            where: {
                name: { contains: query }
            },
            orderBy: {
                name: "asc"
            }
        });
    }
    async deleteArtist(id) {
        await prisma.artists.delete({
            where: {
                id
            }
        });
    }
    async createArtist(name, image) {
        return prisma.artists.create({
            data: {
                name,
                image
            }
        });
    }
    async updateArtist(id, name, image) {
        return prisma.artists.update({
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
