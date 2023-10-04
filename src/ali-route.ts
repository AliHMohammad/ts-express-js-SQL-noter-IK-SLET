import express, { Express, Request, Response } from "express";
import fs from "fs/promises";

const aliRouter = express.Router();

aliRouter.get("/ali", (request: Request, response: Response) => {
    response.send("Ali")
})




export { aliRouter };
