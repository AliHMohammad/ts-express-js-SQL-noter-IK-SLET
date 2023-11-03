import prisma from "../Database/data-source.js";
export default class ArtistRepository {
    constructor() { }
    async getAllArtists() {
        return prisma.artist.findMany({
            orderBy: {
                name: "asc"
            }
        });
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
