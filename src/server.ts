import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./Database/data-source.js";
import { artistRouter } from "./Artist/Router/ArtistRouter.js";
import { albumRouter } from "./Album/Router/album-route.js";
import { trackRouter } from "./Route/track-route.js";
import { otherRouter } from "./Route/other-route.js";
//IMPORTER "reflect-metadata"
import "reflect-metadata";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (request: Request, response: Response) => {
    response.send("Server is running");
});

app.use("/", artistRouter, albumRouter, trackRouter, otherRouter);

app.listen(port, async () => {
    // DETTE FORBINDER DIN TYPEORM TIL DATABASEN
    // IMPORTER DIN APPDATASOURCE OG KØR INITIALIZE().
    await AppDataSource.initialize();
    console.log("App is running on port " + port);
});
