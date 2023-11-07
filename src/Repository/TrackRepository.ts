import {album, artist} from "@prisma/client";
import prisma from "../Database/data-source.js";


export default class TrackRepository {
    constructor() {}

    public async getAllTracks(sort: string, direction: string) {
        const orderBy = {
            [sort]: direction.toLowerCase()
        }
        console.log(orderBy);

        const tracks = await prisma.track.findMany({
            select: {
                id: true,
                title: true,
                duration: true,
                trackArtist: {
                    include: {
                        artist: true
                    },
                    orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                },
                trackAlbum: {
                    include: {
                        album: true
                    },
                    orderBy: {
                        album: {
                            title: "asc"
                        }
                    }
                }
            },
            orderBy: orderBy
        })

        return {
            data: tracks
        }
    }

    public async getSingleTrack(id: number) {
        return prisma.track.findUniqueOrThrow({
            select: {
                id: true,
                title: true,
                duration: true,
                trackArtist: {
                    include: {
                        artist: true
                    },
                    orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                },
                trackAlbum: {
                    include: {
                        album: true
                    },
                    orderBy: {
                        album: {
                            title: "asc"
                        }
                    }
                }
            },
            where: {
                id
            }
        })
    }

    public async searchTracks(query: string) {
        return prisma.track.findMany({
            select: {
                id: true,
                title: true,
                duration: true,
                trackArtist: {
                    include: {
                        artist: true
                    },
                    orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                },
                trackAlbum: {
                    include: {
                        album: true
                    },
                    orderBy: {
                        album: {
                            title: "asc"
                        }
                    }
                }
            },
            where: {
              title: {
                  contains: query
              }
            },
            orderBy: {
                title: "asc"
            }
        })
    }

    public async createTrack(title: string, duration: number, artists: artist[], albums: album[]){

        const track = await prisma.track.create({
            data: {
                title,
                duration
            }
        })

        for (const artist of artists) {
            await prisma.artist_track.create({
                data: {
                    track_id: track.id,
                    artist_id: artist.id
                }
            })
        }

        for (const album of albums) {
            await prisma.album_track.create({
                data: {
                    track_id: track.id,
                    album_id: album.id,
                },
            });
        }

        return track;
    }

    public async updateTrack(id: number, title: string, duration: number, artists: artist[], albums: album[]){

        await prisma.track.update({
            data: {
                title,
                duration
            },
            where: {
                id
            }
        })

        await prisma.album_track.deleteMany({
            where: {
                track_id: id
            }
        })

        await prisma.artist_track.deleteMany({
            where: {
                track_id: id
            }
        })

        for (const artist of artists) {
            await prisma.artist_track.create({
                data: {
                    track_id: id,
                    artist_id: artist.id
                }
            })
        }

        for (const album of albums) {
            await prisma.album_track.create({
                data: {
                    track_id: id,
                    album_id: album.id
                }
            })
        }
    }

    public async deleteTrack(id: number){
        return prisma.track.delete({
            where: {
                id
            }
        })
    }

    public async getTracksOnSpecificPage(sort: string, direction: string, pageSize: number, offsetValue: number) {
        const orderBy = {
            [sort]: direction.toLowerCase()
        }

        const transactionResult = await prisma.$transaction(async (prisma) => {
            const tracks = await prisma.track.findMany({
                select: {
                    id: true,
                    title: true,
                    duration: true,
                    trackArtist: {
                        include: {
                            artist: true
                        },
                        orderBy: {
                            artist: {
                                name: "asc"
                            }
                        }
                    },
                    trackAlbum: {
                        include: {
                            album: true
                        },
                        orderBy: {
                            album: {
                                title: "asc"
                            }
                        }
                    }
                },
                orderBy: orderBy,
                skip: offsetValue,
                take: pageSize,
            })

            const count = await prisma.track.count();
            return {
                data: tracks,
                totalCount: count
            }
        })

        return transactionResult;
    }

}