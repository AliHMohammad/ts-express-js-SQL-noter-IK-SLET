import express from "express";
import cors from "cors";
import { aliRouter } from "./ali-route.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.listen(port, () => {
    console.log("App is runnong on port " + port);
});
app.get("/", (request, response) => {
    response.send("Server is running");
});
app.use("/", aliRouter);
