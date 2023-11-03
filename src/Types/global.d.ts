import {artist, track} from "@prisma/client";

type Artist = {
    id: number,
    name: string,
    image: string
    tracks: track[]
}

type Track = {
    id: number
    title: string,
    duration: number
    artists: artist[]
}
