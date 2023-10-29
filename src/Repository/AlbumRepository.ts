import prisma from "../Database/data-source.js";


export default class AlbumRepository {
    constructor() {}

    public async getAllAlbums() {
        return prisma.albums.findMany({
            orderBy: {
                title: "asc"
            }
        })
    }

    public async getSingleAlbum(id: number) {
        return prisma.albums.findFirstOrThrow({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                tracks:{
                    include: {
                        tracks: {
                            include: {
                                artists: {
                                    include: {
                                        artists: true
                                    }
                                }
                            }
                        }
                    }
                },
                artists: {
                  include: {
                      artists: true
                  }
                }
            },
            where: {
                id
            }
        })
    }

    public async searchAlbums(query: string) {

    }

    public async deleteAlbum(id: number) {

    }
}