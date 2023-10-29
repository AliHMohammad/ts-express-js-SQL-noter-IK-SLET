import prisma from "../Database/data-source.js";
export default class AlbumRepository {
    constructor() { }
    async getAllAlbums() {
        return prisma.albums.findMany({
            orderBy: {
                title: "asc"
            }
        });
    }
    async getSingleAlbum(id) {
        return prisma.albums.findFirstOrThrow({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                tracks: {
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
        });
    }
    async searchAlbums(query) {
    }
    async deleteAlbum(id) {
    }
}
