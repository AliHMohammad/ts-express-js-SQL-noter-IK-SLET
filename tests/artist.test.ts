import {app} from "../src/server";
import prisma from "../src/Database/data-source";
import supertest from "supertest"

describe("Artists", () => {

    const artists = [
        { name: "Andy Warhol", image: "warhol.jpg" },
        { name: "Claude Monet", image: "monet.jpg" },
        { name: "Edvard Munch", image: "munch.jpg" },
        { name: "Frida Kahlo", image: "frida.jpg" },
        { name: "Georgia O'Keeffe", image: "okeeffe.jpg" },
        { name: "Katsushika Hokusai", image: "hokusai.jpg" },
        { name: "Leonardo da Vinci", image: "davinci.jpg" },
        { name: "Pablo Picasso", image: "picasso.jpg" },
        { name: "Salvador Dali", image: "dali.jpg" },
        { name: "Vincent van Gogh", image: "vangogh.jpg" }
    ];

    beforeAll(async () => {
        await prisma.artist.createMany({
            data: artists
        })

        console.log("Created many artists")


    })

    afterAll(async () => {
        const deleteArtists = prisma.artist.deleteMany();
        const deleteAlbums = prisma.album.deleteMany();
        const deleteTracks = prisma.track.deleteMany();

        await prisma.$transaction([
            deleteTracks,
            deleteAlbums,
            deleteArtists
        ])

        await prisma.$disconnect();
    })



    describe("Get Artists", () => {

        it('should return 10 artists', async () => {
            const {body, statusCode} = await supertest(app).get("/artists")

            expect(body.length).toBe(10);
            expect(statusCode).toBe(200);
            body.forEach((artist: any, index: number) => {
                expect(artist).toHaveProperty("id")
                expect(artist.name).toEqual(artists[index].name)
                expect(artist.image).toEqual(artists[index].image)
            })
        });
    })

    describe("Get single artist", () => {
        it('should return the correct artist when given id', async () => {
            const {id} = await prisma.artist.create({
                data: {
                    name: "Ali",
                    image: "Ali.jpg"
                }
            })

            const {body, statusCode} = await supertest(app).get(`/artists/${id}`)
            console.log(body)
            expect(statusCode).toBe(200);
            expect(body.id).toEqual(id);
            expect(body.name).toEqual("Ali");
            expect(body.image).toEqual("Ali.jpg");
        });
    })

})