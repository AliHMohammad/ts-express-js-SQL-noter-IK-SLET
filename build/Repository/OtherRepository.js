import prisma from "../Database/data-source.js";
export default class OtherRepository {
    constructor() { }
    ;
    async searchAll(query) {
        return prisma.$transaction(async (prisma) => {
            const result = {
                artists: [],
                tracks: [],
                albums: []
            };
            result.artists = await prisma.artist.findMany({
                where: {
                    name: {
                        contains: query
                    }
                }
            });
            result.albums = await prisma.album.findMany({
                where: {
                    title: {
                        contains: query
                    }
                }
            });
            result.tracks = await prisma.track.findMany({
                where: {
                    title: {
                        contains: query
                    }
                }
            });
            return result;
        });
    }
}
