import express from "express";
import { createAlbum, deleteAlbum, getAllAlbums, getSingleAlbum, searchAlbums } from "../Controller/album-controller.js";

const albumRouter = express.Router();

albumRouter.get("/albums/:albumId", getSingleAlbum);

albumRouter.get("/albums", getAllAlbums);

albumRouter.delete("/albums/:albumId", deleteAlbum);

albumRouter.post("/albums", createAlbum)

albumRouter.put("/albums/:albumId", );

albumRouter.get("/search/albums", searchAlbums);

export { albumRouter };
