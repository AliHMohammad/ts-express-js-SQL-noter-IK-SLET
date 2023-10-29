import express from "express"
import TrackController from "../Controller/TrackController.js";


const trackController = new TrackController()
const trackRouter = express.Router();

trackRouter.get("/tracks/:trackId", trackController.getSingleTrackExecutor);

trackRouter.get("/tracks", trackController.getAllTracksExecutor);

trackRouter.delete("/tracks/:trackId", trackController.deleteTrackExecutor);

trackRouter.post("/tracks", trackController.createTrackExecutor);

trackRouter.put("/tracks/:trackId", trackController.updateTrackExecutor);

trackRouter.get("/search/tracks", trackController.searchTracks);

trackRouter.get("/tracks/artist/:artistId", trackController.getAllTracksFromArtistExecutor)

export { trackRouter };