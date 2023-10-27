import { Request, Response } from "express";
import { AppDataSource } from "../Database/data-source.js";
import { Albums } from "../Album/Model/Albums.js";
import { Artists } from "../Artist/Model/Artists.js";
import { Tracks } from "../Model/Tracks.js";

const albumRepository = AppDataSource.getRepository(Albums);
const artistsRepository = AppDataSource.getRepository(Artists);
const trackRepository = AppDataSource.getRepository(Tracks);

//GET SINGLE
async function getSingleAlbum(request: Request<{ albumId: string }, {}, {}, {}>, response: Response) {
    //Get all information from album by ID
    try {
        const id = parseInt(request.params.albumId);

        //? Der angives et alias, som er hvad der står i createQueryBuilder("")
        //? Dette alias bruger vi, når vi så skal referere til dens properties.
        //? "album" har følgende properties: title, yearOfRelease, artists, albums
        //? Når vi skal joine, angiver vi hvorhenne dette resultat skal sidde på "album"
        //? I den første skal den sidde på album.tracks, hvor vi joiner med "tracks" tabellen
        //! Jeg ved ikke hvorfor "trackArtists" virker, men samme princip holder med, at tracks har propertien artists
        const albums = await albumRepository
            .createQueryBuilder("album")
            .innerJoinAndSelect("album.tracks", "tracks")
            .innerJoinAndSelect("album.artists", "artists")
            .innerJoinAndSelect("tracks.artists", "trackArtists")
            .where("album.id = :id", { id })
            .orderBy({
                "tracks.title": "ASC",
                "artists.name": "ASC",
            })
            .getOneOrFail();

        response.status(200).json(albums);
    } catch (error: any) {
        switch (error.name) {
            case "EntityNotFoundError":
                response.status(404).json({ error: error.message });
                break;
            default:
                response.status(500).json({ error: error.message });
                break;
        }
    }
}

//GET ALL
async function getAllAlbums(request: Request<{}, {}, {}, {}>, response: Response) {
    //Get all information from albums
    try {
        const albums = await albumRepository
            .createQueryBuilder("album")
            .innerJoinAndSelect("album.tracks", "tracks")
            .innerJoinAndSelect("album.artists", "artists")
            .innerJoinAndSelect("tracks.artists", "trackArtists")
            .orderBy({
                "album.title": "ASC",
                "tracks.title": "ASC",
                "artists.name": "ASC",
            })
            .getMany();

        if (albums.length === 0) {
            response.status(404).json({ error: "Could not find any albums" });
        }

        response.status(200).json(albums);
    } catch (error: any) {
        response.status(500).json({ error: error });
    }
}

//DELETE
async function deleteAlbum(request: Request<{ albumId: string }, {}, {}, {}>, response: Response) {
    const id = parseInt(request.params.albumId);

    try {
        //Sletter også på cascade (relations), da dette er angivet i vores entitites og vores SQL backend (datagrip)
        const deleteResult = await albumRepository.createQueryBuilder("album").delete().where("id = :id", { id }).execute();

        if (deleteResult.affected === 0) {
            throw new Error("No album found by specified ID");
        }

        response.status(204).json();
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//UPDATE
async function updateAlbum(
    request: Request<{ albumId: string }, {}, { title: string; yearOfRelease: string; image: string; artists?: Artists[]; tracks?: Tracks[] }, {}>,
    response: Response
) {
    const id = parseInt(request.params.albumId);

    const { title, image, artists, tracks } = request.body;
    const yearOfRelease = parseInt(request.body.yearOfRelease);

    try {
        if (!title || !image || !yearOfRelease) {
            throw new Error("Parameters missing");
        }
        // 1. Update album itself.
        const newAlbum = albumRepository.create({
            title,
            image,
            yearOfRelease,
        });

        const updateResult = await albumRepository.createQueryBuilder("album").update().set(newAlbum).where("id = :id", { id }).execute();

        if (updateResult.affected === 0) {
            throw new Error("Error at saving updated album");
        }

        // 2. Fetch the newly updated album so that you can attach artists and/or tracks to it, if they are defined.
        const updatedAlbum = await albumRepository
            .createQueryBuilder("album")
            .innerJoinAndSelect("album.tracks", "tracks")
            .innerJoinAndSelect("album.artists", "artists")
            .where("album.id = :id", { id })
            .getOneOrFail();

        if (artists) {
            updatedAlbum.artists = artists;

            if (tracks) {
                updatedAlbum.tracks = tracks;
            }

            await albumRepository.save(updatedAlbum);
        }

        response.status(201).json({ message: "Completed" });
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//CREATE
async function createAlbum(request: Request<{}, {}, { title: string; yearOfRelease: string; image: string; artists: Artists[]; tracks: Tracks[] }, {}>, response: Response) {
    //Den her er i stand til at oprette helt nye sange, der ikke i forvejen eksisterer i databasen - dog med artister, der allerede eksisterer.
    const { title, image, artists, tracks } = request.body;
    const yearOfRelease = parseInt(request.body.yearOfRelease);

    try {
        if (!title || !yearOfRelease || !image || !artists || !tracks) {
            throw new Error("Parameters missing");
        }

        // 1. Create the Album
        const newAlbum = albumRepository.create({
            title,
            image,
            yearOfRelease,
            artists: [],
            tracks: [],
        });

        const savedAlbum = await albumRepository.save(newAlbum);

        // 2. Create and Save Artists
        const savedArtists = await Promise.all(
            artists.map(async (artistData) => {
                const newArtist = artistsRepository.create(artistData);
                return await artistsRepository.save(newArtist);
            })
        );

        // 3. Create and Save Tracks
        const savedTracks = await Promise.all(
            tracks.map(async (trackData) => {
                const newTrack = trackRepository.create(trackData);
                const savedTrack = await trackRepository.save(newTrack);

                // 3.5 Create and save artists and associate it with their track
                savedTrack.artists.map(async (artistData) => {
                    const newArtist = artistsRepository.create(artistData);
                    const savedArtist = await artistsRepository.save(newArtist);
                    savedTrack.artists.push(savedArtist);
                });

                return savedTrack;
            })
        );

        // 4. Associate Artists and Tracks with the Album
        savedAlbum.artists = savedArtists;
        savedAlbum.tracks = savedTracks;
        await albumRepository.save(savedAlbum);

        response.status(204).json({});
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

//SEARCH
async function searchAlbums(request: Request<{}, {}, {}, { q: string }>, response: Response) {
    const query = request.query.q;

    try {
        const albums = await albumRepository
            .createQueryBuilder("album")
            .innerJoinAndSelect("album.tracks", "tracks")
            .innerJoinAndSelect("album.artists", "artists")
            .innerJoinAndSelect("tracks.artists", "trackArtists")
            .where("album.title LIKE :searchTerm", { searchTerm: `%${query}%` })
            .orderBy("album.title")
            .getMany();

        if (albums.length === 0) {
            throw new Error("Could not find any match");
        } else {
            response.status(201).json(albums);
        }
    } catch (error: any) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export { getAllAlbums, getSingleAlbum, deleteAlbum, createAlbum, searchAlbums, updateAlbum };
