import express from "express";
import { createArtist, deleteArtist, getAllArtists, getSingleArtist, searchArtists, updateArtist } from "../Controller/artist-controller.js";

const artistRouter = express.Router();

artistRouter.get("/artists/:artistId", getSingleArtist);

artistRouter.get("/artists", getAllArtists);

artistRouter.delete("/artists/:artistId", deleteArtist);

artistRouter.post("/artists", createArtist)

artistRouter.put("/artists/:artistId", updateArtist);

artistRouter.get("/search/artists", searchArtists);

export { artistRouter };