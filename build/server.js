import express from "express";
import cors from "cors";
import { artistRouter } from "./artist-router.js";
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.listen(port, () => {
    console.log("App is runnong on port " + port);
});
app.get("/", (request, response) => {
    response.send("Server is running");
});
app.use("/", artistRouter);
