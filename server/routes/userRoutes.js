import express from "express";
import userAuth from "../middleware/userAuth.js";
import { deleteUser, getUserData } from "../controllers/userController.js";

// Create router
const userRouter = express.Router();

// Create endpoint
userRouter.get("/data", userAuth, getUserData);
userRouter.delete("/delete", userAuth, deleteUser);

export default userRouter;
