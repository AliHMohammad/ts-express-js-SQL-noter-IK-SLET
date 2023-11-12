import {app} from "../src/server";
import prisma from "../src/Database/data-source";
import supertest from "supertest"

describe("Artists", () => {

    beforeAll(async () => {
        await prisma.artist.createMany({
            data: [
                { name: "Vincent van Gogh", image: "vangogh.jpg" },
                { name: "Pablo Picasso", image: "picasso.jpg" },
                { name: "Leonardo da Vinci", image: "davinci.jpg" },
                { name: "Frida Kahlo", image: "frida.jpg" },
                { name: "Claude Monet", image: "monet.jpg" },
                { name: "Salvador Dali", image: "dali.jpg" },
                { name: "Georgia O'Keeffe", image: "okeeffe.jpg" },
                { name: "Andy Warhol", image: "warhol.jpg" },
                { name: "Edvard Munch", image: "munch.jpg" },
                { name: "Katsushika Hokusai", image: "hokusai.jpg" }
            ]
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
        });
    })
})