import express from "express";
import { getSingleArtist } from "./ali-controller.js";
const userRouter = express.Router();
userRouter.get("/users/:userId", getSingleArtist);
userRouter.put("/users/:userId", (request, response) => {
    const userId = Number(request.params.userId);
    //dateOfBirth: "2023-10-04T12:34:56.789Z"
    const { firstName, lastName, dateOfBirth, height, isAlive } = request.body;
    const newDateOfBirth = new Date(dateOfBirth);
    //true
    console.log(newDateOfBirth instanceof Date);
    response.send("yessir");
});
userRouter.get("/search", (request, response) => {
    //postman: localhost:3000/search?q=yourSearchTerm
    const query = request.query.q;
});
export { userRouter };
