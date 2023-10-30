import prisma from "../Database/data-source.js";


export default class AlbumRepository {
    constructor() {}

    public async getAllAlbums() {
        return prisma.albums.findMany({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                tracks:{
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
        })
    }

    public async getSingleAlbum(id: number) {
        return prisma.albums.findFirstOrThrow({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                tracks:{
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
        })
    }

    public async searchAlbums(query: string) {
        return prisma.albums.findMany({
            select: {
                id: true,
                title: true,
                yearOfRelease: true,
                image: true,
                tracks:{
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
                title: {contains: query}
            },
            orderBy: {
                title: "asc"
            }
        })
    }

    public async deleteAlbum(id: number) {
        await prisma.albums.delete({
            where: {
                id
            }
        })
    }

    public async createAlbum(title: string, yearOfRelease: number, image: string, artists: any, tracks: any) {
        console.log(artists.map((artist: Artist) => ({ id: artist.id })))
        console.log(tracks.map((track: Track) => ({ id: track.id })))


        const album = await prisma.albums.create({
            data: {
                title,
                yearOfRelease,
                image,
                artists: {
                    connect: [
                        {
                            artist_id_album_id: {
                                artist_id: 4,
                                album_id: 2
                            }
                        }
                    ],
                },
                tracks: {
                    connect: [
                        {
                            album_id_track_id: {
                                track_id: 2,
                                album_id: 2
                            }
                        }
                    ]
                },
            },
        });

        return album













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