import express from "express";
import cors from "cors";
import {artistRouter} from "./Route/artist-router.js";
import {albumRouter} from "./Route/album-route.js";
import {trackRouter} from "./Route/track-route.js";
import {otherRouter} from "./Route/other-route.js";


export default function createServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use("/", artistRouter, albumRouter, trackRouter, otherRouter);

    return app;
}

