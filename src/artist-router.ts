import express, { Express, Request, Response } from "express";
import { connection } from "./connection.js";
import { deleteArtist, getAllArtists, getSingleArtist, searchArtists, updateArtist } from "./artist-controller.js";

const artistRouter = express.Router();

artistRouter.get("/artists/:artistId", getSingleArtist)

artistRouter.get("/artists", getAllArtists);

artistRouter.delete("/artists/:artistId", deleteArtist);

artistRouter.put("/artists/:artistId", updateArtist);

artistRouter.get("/search", searchArtists);




export { artistRouter };
