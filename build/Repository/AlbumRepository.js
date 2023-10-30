import prisma from "../Database/data-source.js";
export default class AlbumRepository {
    constructor() { }
    async getAllAlbums() {
        return prisma.albums.findMany({
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
                                    }, orderBy: {
                                        artists: {
                                            name: "asc"
                                        }
                                    }
                                }
                            }
                        }
                    }, orderBy: {
                        tracks: {
                            title: "asc"
                        }
                    }
                },
                artists: {
                    include: {
                        artists: true
                    }, orderBy: {
                        artists: {
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
                                    }, orderBy: {
                                        artists: {
                                            name: "asc"
                                        }
                                    }
                                }
                            }
                        }
                    }, orderBy: {
                        tracks: {
                            title: "asc"
                        }
                    }
                },
                artists: {
                    include: {
                        artists: true
                    }, orderBy: {
                        artists: {
                            name: "asc"
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
        return prisma.albums.findMany({
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
                                    }, orderBy: {
                                        artists: {
                                            name: "asc"
                                        }
                                    }
                                }
                            }
                        }
                    }, orderBy: {
                        tracks: {
                            title: "asc"
                        }
                    }
                },
                artists: {
                    include: {
                        artists: true
                    }, orderBy: {
                        artists: {
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
        await prisma.albums.delete({
            where: {
                id
            }
        });
    }
    async createAlbum(title, yearOfRelease, image, artists, tracks) {
        console.log(artists.map((artist) => ({ id: artist.id })));
        console.log(tracks.map((track) => ({ id: track.id })));
        // Step 1: Create the Album
        const createdAlbum = await prisma.albums.create({
            data: {
                title,
                yearOfRelease,
                image,
            },
        });
        // Step 2: Connect Artists and Tracks to the Album using the obtained album.id
        await prisma.albums.update({
            where: { id: createdAlbum.id },
            data: {
                artists: {
                    connectOrCreate: {
                        where: {
                            artist_id_album_id: {
                                artist_id: 1,
                                album_id: createdAlbum.id,
                            },
                        },
                        create: {
                            name: "bib",
                            image: "bob",
                        },
                    },
                },
                tracks: {
                    connectOrCreate: {
                        where: {
                            album_id_track_id: {
                                track_id: 1,
                                album_id: createdAlbum.id,
                            },
                        },
                        create: {
                            name: "track",
                            image: "track-billede",
                        },
                    },
                },
            },
        });
        return createdAlbum;
        // return prisma.albums.create({
        //     data: {
        //         title,
        //         yearOfRelease,
        //         image,
        //         artists: {
        //             connectOrCreate: artists.map((artist: Artist) => ({
        //                 where: {
        //                     id: artist.id
        //                 },
        //                 create: {
        //                     name: artist.name,
        //                     image: artist.image
        //                 }
        //             }))
        //         },
        //         tracks: {
        //             connectOrCreate: tracks.map((track: Track) => {
        //                 return {
        //                     where: {id: track.id},
        //                     create: {
        //                         name: track.title,
        //                         image: track.duration
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    }
}
