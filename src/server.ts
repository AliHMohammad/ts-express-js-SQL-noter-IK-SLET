import express, { Express, Request, Response } from "express";
import fs from "fs/promises";
import cors from "cors";
import { userRouter } from "./ali-route.js";

const app: Express = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log("App is runnong on port " + port);
    
})




app.get("/", (request: Request, response: Response) => {
    response.send("Server is running")
})

app.use("/", userRouter)