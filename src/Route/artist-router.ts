import express from "express";
import ArtistController from "../Controller/ArtistController.js";


const artistController = new ArtistController();
const artistRouter = express.Router();

artistRouter.get("/artists/:artistId", artistController.getSingleArtistExecutor);

artistRouter.get("/artists", artistController.getAllArtistsExecutor);

artistRouter.delete("/artists/:artistId", artistController.deleteArtistExecutor);

artistRouter.post("/artists", artistController.createArtistExecutor)

artistRouter.put("/artists/:artistId", artistController.updateArtistExecutor);

artistRouter.get("/search/artists", artistController.searchArtists);

export { artistRouter };
