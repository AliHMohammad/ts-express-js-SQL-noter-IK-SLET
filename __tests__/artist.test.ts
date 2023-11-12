import supertest from "supertest";
import {app} from "../src/server";

describe("Artist", () => {

    describe("Get Artist", () => {

        it('should return 404, if artist not found', async() => {
            const artistId = "afddfssdf";

            await supertest(app).get(`/artists/${artistId}`).expect(404);
        });

        it('should return 200, if artist is found', async () => {
            const artistId = 1
            await supertest(app).get(`/artists/${artistId}`).expect(200);
        });
    })
})