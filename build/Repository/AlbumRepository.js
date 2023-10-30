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
}
