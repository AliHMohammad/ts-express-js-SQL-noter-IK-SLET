import prisma from "../Database/data-source.js";
export default class AlbumRepository {
    constructor() { }
    async getAllAlbums() {
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
        });
    }
    async getSingleAlbum(id) {
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
        });
    }
    async searchAlbums(query) {
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
                title: { contains: query }
            },
            orderBy: {
                title: "asc"
            }
        });
    }
    async deleteAlbum(id) {
        await prisma.album.delete({
            where: {
                id
            }
        });
    }
    async createAlbum(title, yearOfRelease, image, artists, tracks) {
        const album = await prisma.album.create({
            data: {
                title,
                yearOfRelease,
                image,
            }
        });
        //Create associations with artists
        artists.map(async (artist) => {
            await prisma.artist_album.create({
                data: {
                    artist_id: artist.id,
                    album_id: album.id
                }
            });
        });
        //Create associations with tracks
        tracks.map(async (track) => {
            await prisma.album_track.create({
                data: {
                    album_id: album.id,
                    track_id: track.id
                }
            });
        });
    }
    async updateAlbum(id, title, yearOfRelease, image, artists, tracks) {
        //Update the album itself
        await prisma.album.update({
            data: {
                title,
                yearOfRelease,
                image
            },
            where: {
                id
            }
        });
        //Remove all associations with artists
        await prisma.artist_album.deleteMany({
            where: { album_id: id }
        });
        //Remove all associations with tracks
        await prisma.album_track.deleteMany({
            where: { album_id: id }
        });
        //Create new associations with artists
        for (const artist of artists) {
            await prisma.artist_album.create({
                data: {
                    artist_id: artist.id,
                    album_id: id
                }
            });
        }
        //Create new associations with tracks
        for (const track of tracks) {
            await prisma.album_track.create({
                data: {
                    album_id: id,
                    track_id: track.id
                }
            });
        }
        return this.getSingleAlbum(id);
    }
}
