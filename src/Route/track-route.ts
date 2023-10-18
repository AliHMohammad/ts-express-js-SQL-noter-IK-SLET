import express from "express"
import { getSingleTrack, getAllTracks, createTrack, deleteTrack, searchTracks, updateTrack, getAllTracksFromSingleArtist } from "../Controller/track-controller.js";

const trackRouter = express.Router();

trackRouter.get("/tracks/:trackId", getSingleTrack);

trackRouter.get("/tracks", getAllTracks);

trackRouter.delete("/tracks/:trackId", deleteTrack);

trackRouter.post("/tracks", createTrack);

trackRouter.put("/tracks/:trackId", updateTrack);

trackRouter.get("/search/tracks", searchTracks);

trackRouter.get("/tracks/artist/:artistId", getAllTracksFromSingleArtist)

export { trackRouter };