import express from "express";
import AlbumController from "../Controller/AlbumController.js";

const albumController = new AlbumController();
const albumRouter = express.Router();

albumRouter.get("/albums/:albumId", albumController.getSingleAlbumExecutor);

albumRouter.get("/albums", albumController.getAllAlbumsExecutor);

albumRouter.delete("/albums/:albumId", albumController.deleteAlbumExecutor);

albumRouter.post("/albums", albumController.createAlbumExecutor)

albumRouter.put("/albums/:albumId", albumController.updateAlbumExecutor);

albumRouter.get("/search/albums", albumController.searchAlbumsExecutor);

export { albumRouter };
