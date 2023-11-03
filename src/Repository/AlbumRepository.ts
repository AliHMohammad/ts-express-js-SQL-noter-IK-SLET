import prisma from "../Database/data-source.js";
import {artist, track} from "@prisma/client";
import {Artist, Track} from "../Types/global";


export default class AlbumRepository {
    constructor() {}

    public async getAllAlbums() {
        return prisma.album.findMany({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                albumTrack:{
                    include: {
                        track: {
                            include: {
                                trackArtist: {
                                    include: {
                                        artist: true
                                    },
                                    orderBy: {
                                        artist: {
                                            name: "asc"
                                        }
                                    }
                                }
                            }
                        }
                    }, orderBy: {
                        track: {
                            title: "asc"
                        }
                    }
                },
                albumArtist: {
                    include: {
                        artist: true
                    }, orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                }
            }, orderBy: {
                title: "asc"
            }
        })
    }

    public async getSingleAlbum(id: number) {
        return prisma.album.findFirstOrThrow({
            select: {
                id: true,
                title: true,
                image: true,
                yearOfRelease: true,
                albumArtist: {
                    include: {
                        artist: true
                    },
                    orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                },
                albumTrack: {
                    include: {
                        track: {
                            include: {
                                trackArtist: {
                                    include: {
                                        artist: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        track: {
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

    public async searchAlbums(query: string) {
        return prisma.album.findMany({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                albumTrack: {
                    include: {
                        track: {
                            include: {
                                trackArtist: {
                                    include: {
                                        artist:  true
                                    },
                                    orderBy: {
                                        artist: {
                                            name: "asc"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                albumArtist: {
                    include: {
                        artist: true
                    },
                    orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                }
            },
            where: {
                title: {contains: query}
            },
            orderBy: {
                title: "asc"
            }
        })
    }

    public async deleteAlbum(id: number) {
        await prisma.album.delete({
            where: {
                id
            }
        })
    }

    public async createAlbum(title: string, yearOfRelease: number, image: string, artists:  any, tracks: any) {

        const album = await prisma.album.create({
            data: {
                title,
                yearOfRelease,
                image,
            }
        })

        const result = await prisma.album.update({
            where: {
                id: album.id,
            },
            data: {
                albumArtist: {
                    connect: artists.map((artist: artist) => ({
                        artist_id_album_id: {
                            artist_id: 5,
                            album_id: album.id
                        }
                    }))
                },
                albumTrack: {
                    connectOrCreate: tracks.map((track: track) => ({

                    }))
                }
            }
        })

        return result

        /*artists.map(async (artist) => {
            await prisma.artist_album.create({
                data: {
                    artist_id: artist.id,
                    album_id: album.id
                }
            })
        });


        tracks.map(async (track) => {
            await prisma.album_track.create({
                data: {
                    album_id: album.id,
                    track_id: track.id
                }
            })
        });

        return prisma.album.findUniqueOrThrow({
            where: {
                id: album.id
            },
            select: {
                id: true,
                title: true,
                image: true,
                yearOfRelease: true,
                albumArtist: {
                    include: {
                        artist: true
                    },
                    orderBy: {
                        artist: {
                            name: "asc"
                        }
                    }
                },
                albumTrack: {
                    include: {
                        track: {
                            include: {
                                trackArtist: {
                                    include: {
                                        artist: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        track: {
                            title: "asc"
                        }
                    }
                }
            }
        });*/
    }
}