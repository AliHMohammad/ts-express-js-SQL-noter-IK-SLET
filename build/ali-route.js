import express from "express";
const aliRouter = express.Router();
aliRouter.get("/ali", (request, response) => {
    response.send("Ali");
});
export { aliRouter };
