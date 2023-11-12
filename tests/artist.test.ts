import supertest from "supertest";
import {app} from "../src/server";

describe("Artist", () => {

    describe("Get Artist", () => {

        it('should return 404, if artist not found', async() => {
            const artistId = "afddfssdf";

            const {body, statusCode} = await supertest(app).get(`/artists/${artistId}`)

            expect(statusCode).toBe(404)
        });

        it('should return 200, if artist is found', async () => {
            const artistId = 1
            const {body, statusCode} = await supertest(app).get(`/artists/${artistId}`)

            expect(statusCode).toBe(200)
            expect(body.name).toBe("Daft Punk");
        });
    })
})


