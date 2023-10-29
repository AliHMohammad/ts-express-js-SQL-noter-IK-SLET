import express from "express";
import { createAlbum, deleteAlbum, getAllAlbums, getSingleAlbum, searchAlbums, updateAlbum } from "../Controller/album-controller.js";
import AlbumController from "../Controller/AlbumController.js";

const albumController = new AlbumController()
const albumRouter = express.Router();

albumRouter.get("/albums/:albumId", albumController.getSingleAlbumExecutor);

albumRouter.get("/albums", albumController.getAllAlbumsExecutor);

albumRouter.delete("/albums/:albumId", deleteAlbum);

albumRouter.post("/albums", createAlbum)

albumRouter.put("/albums/:albumId", updateAlbum);

albumRouter.get("/search/albums", searchAlbums);

export { albumRouter };
