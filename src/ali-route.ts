import express, { Express, Request, Response } from "express";
import fs from "fs/promises";

const userRouter = express.Router();



userRouter.put("/users/:userId", (request: Request<{userId: string}, {}, {firstName: string, lastName: string, dateOfBirth: Date}, {}>, response: Response) => {
    const id = request.params.userId;

    const { firstName, lastName, dateOfBirth } = request.body;
})

userRouter.put("/users/:userId", (request: Request<{ userId: number }, {}, { firstName: string; lastName: string; dateOfBirth: Date, height: number }, {}>, response: Response) => {
    const userId = Number(request.params.userId);

    const { firstName, lastName, dateOfBirth, height } = request.body;
});


userRouter.get("/users/?q")


export { userRouter };
