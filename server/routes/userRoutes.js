import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";

// Create router
const userRouter = express.Router();

// Create endpoint
userRouter.get("/data", userAuth, getUserData);

export default userRouter;
