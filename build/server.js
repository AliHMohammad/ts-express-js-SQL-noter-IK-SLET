import express from "express";
import cors from "cors";
import { AppDataSource } from "./Database/data-source.js";
import { artistRouter } from "./Router/ArtistRouter.js";
import { albumRouter } from "./Router/AlbumRouter.js";
import { trackRouter } from "./Router/TrackRouter.js";
import { otherRouter } from "./Router/OtherRouter.js";
//IMPORTER "reflect-metadata"
import "reflect-metadata";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
    response.send("Server is running");
});
app.use("/", artistRouter, albumRouter, trackRouter, otherRouter);
app.listen(port, async () => {
    // DETTE FORBINDER DIN TYPEORM TIL DATABASEN
    // IMPORTER DIN APPDATASOURCE OG KØR INITIALIZE().
    await AppDataSource.initialize();
    console.log("App is running on port " + port);
});
