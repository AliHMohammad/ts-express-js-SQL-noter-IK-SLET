import express, { Express, Request, Response } from "express";
import cors from "cors";
import { artistRouter } from "./Route/artist-router.js";
import "reflect-metadata";
import { AppDataSource } from "./Database/data-source.js";
import { albumRouter } from "./Route/album-route.js";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (request: Request, response: Response) => {
    response.send("Server is running");
});

app.use("/", artistRouter, albumRouter);

app.listen(port, async () => {
    console.log("App is runnong on port " + port);
    await AppDataSource.initialize();
});
