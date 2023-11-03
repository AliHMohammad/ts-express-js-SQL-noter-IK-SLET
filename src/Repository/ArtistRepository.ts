import prisma from "../Database/data-source.js";

export default class ArtistRepository {
    constructor() {}

    public async getAllArtists() {
        return prisma.artist.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }

    public async getSingleArtist(id: number) {
        return prisma.artist.findFirstOrThrow({
            include: {
                artistTrack: {
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