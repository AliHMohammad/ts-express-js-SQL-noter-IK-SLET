import express from "express";
import ArtistController from "../Controller/ArtistController.js";


const artistRouter = express.Router();
const artistController = new ArtistController();

artistRouter.get("/artists", artistController.getAllArtistsExecutor);

artistRouter.get("/artists/:artistId", artistController.getSingleArtistExecutor);

artistRouter.delete("/artists/:artistId", artistController.deleteArtistExecutor);

artistRouter.post("/artists", artistController.createArtistExecutor);

artistRouter.put("/artists/:artistId", artistController.updateArtistExecutor);

artistRouter.get("/search/artists", artistController.searchArtistsExecutor);

export { artistRouter };
