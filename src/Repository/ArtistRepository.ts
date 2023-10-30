import prisma from "../Database/data-source.js";

export default class ArtistRepository {
    constructor() {}

    public async getAllArtists() {
        return prisma.artists.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }

    public async getSingleArtist(id: number) {
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
        })
    }

    public async searchArtists(query: string) {
        return prisma.artists.findMany({
            where: {
                name: {contains: query}
            },
            orderBy: {
                name: "asc"
            }
        })
    }

    public async deleteArtist(id: number){
        await prisma.artists.delete({
            where: {
                id
            }
        })
    }

    public async createArtist(name: string, image: string) {
        return prisma.artists.create({
            data: {
                name,
                image
            }
        })
    }

    public async updateArtist(id: number, name: string, image: string) {
        return prisma.artists.update({
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