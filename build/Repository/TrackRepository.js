import prisma from "../Database/data-source.js";
export default class TrackRepository {
    constructor() { }
    async getAllTracks(sort, direction) {
        const orderBy = {
            [sort]: direction.toLowerCase()
        };
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
        });
        return {
            data: tracks
        };
    }
    async getSingleTrack(id) {
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
        });
    }
    async searchTracks(query) {
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
        });
    }
    async createTrack(title, duration, artists, albums) {
        const track = await prisma.track.create({
            data: {
                title,
                duration
            }
        });
        for (const artist of artists) {
            await prisma.artist_track.create({
                data: {
                    track_id: track.id,
                    artist_id: artist.id
                }
            });
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
    async updateTrack(id, title, duration, artists, albums) {
        await prisma.track.update({
            data: {
                title,
                duration
            },
            where: {
                id
            }
        });
        await prisma.album_track.deleteMany({
            where: {
                track_id: id
            }
        });
        await prisma.artist_track.deleteMany({
            where: {
                track_id: id
            }
        });
        for (const artist of artists) {
            await prisma.artist_track.create({
                data: {
                    track_id: id,
                    artist_id: artist.id
                }
            });
        }
        for (const album of albums) {
            await prisma.album_track.create({
                data: {
                    track_id: id,
                    album_id: album.id
                }
            });
        }
    }
    async deleteTrack(id) {
        return prisma.track.delete({
            where: {
                id
            }
        });
    }
    async getTracksOnSpecificPage(sort, direction, pageSize, offsetValue) {
        const orderBy = {
            [sort]: direction.toLowerCase()
        };
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
            });
            const count = await prisma.track.count();
            return {
                data: tracks,
                totalCount: count
            };
        });
        return transactionResult;
    }
}
