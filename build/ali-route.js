import express from "express";
const userRouter = express.Router();
userRouter.put("/users/:userId", (request, response) => {
    const id = request.params.userId;
    const { firstName, lastName, dateOfBirth } = request.body;
});
userRouter.put("/users/:userId", (request, response) => {
    const userId = Number(request.params.userId);
    const { firstName, lastName, dateOfBirth, height } = request.body;
});
userRouter.get("/users/?q");
export { userRouter };
