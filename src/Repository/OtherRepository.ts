import { album, artist, track } from "@prisma/client"
import prisma from "../Database/data-source.js"



export default class OtherRepository {
    constructor() { };

    public async searchAll(query: string) {
        type Tresult = {
            artists?: artist[],
            tracks?: track[],
            albums?: album[]
        }

        const result: Tresult = {}

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
    }
}