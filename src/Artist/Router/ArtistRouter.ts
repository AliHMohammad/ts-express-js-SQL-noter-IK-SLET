import express from "express";
import { createArtist, deleteArtist, searchArtists, updateArtist } from "../../Controller/artist-controller.js";
import ArtistController from "../Controller/ArtistController.js";

const artistRouter = express.Router();
const artistController = new ArtistController();


artistRouter.get("/artists", artistController.getAllArtistsExecutor);

artistRouter.get("/artists/:artistId", artistController.getSingleArtistExecutor);


artistRouter.delete("/artists/:artistId", deleteArtist);

artistRouter.post("/artists", artistController.createArtistExecutor);

artistRouter.put("/artists/:artistId", updateArtist);

artistRouter.get("/search/artists", searchArtists);

export { artistRouter };
