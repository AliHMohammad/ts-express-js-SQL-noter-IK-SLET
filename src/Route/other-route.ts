import express from "express";
import OtherController from "../Controller/OtherController.js";


const otherController = new OtherController()
const otherRouter = express.Router();


otherRouter.get("/search", otherController.searchAllExecutor)


export {otherRouter}