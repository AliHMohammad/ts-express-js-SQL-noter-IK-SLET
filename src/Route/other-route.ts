import express from "express";
import { searchAll } from "../Controller/other-controller.js";


const otherRouter = express.Router();


otherRouter.get("/search", searchAll)


export {otherRouter}