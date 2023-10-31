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
        const album = await prisma.albums.create({
            data: {
                title,
                yearOfRelease,
                image,
                artists: {
                    connect: artists.map((artist) => {
                        return {
                            id: artist.id
                        };
                    }),
                },
                tracks: {
                    connect: tracks.map((track) => {
                        return {
                            id: track.id
                        };
                    })
                },
            },
        });
        return album;
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
