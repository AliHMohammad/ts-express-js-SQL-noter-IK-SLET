import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./Database/data-source.js";
import { artistRouter } from "./Route/artist-router.js";
import { albumRouter } from "./Route/album-route.js";
import { trackRouter } from "./Route/track-route.js";
import { otherRouter } from "./Route/other-route.js";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (request: Request, response: Response) => {
    response.send("Server is running");
});

app.use("/", artistRouter, albumRouter, trackRouter, otherRouter);

app.listen(port, async () => {
    await AppDataSource.initialize();
    console.log("App is running on port " + port);
});
