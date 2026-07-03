import express from "express";
import userAuth from "../middleware/userAuth.js";
import { deleteUser, getUserData } from "../controllers/userController.js";

// Router for user-related endpoints that require authentication.
const userRouter = express.Router();

// Get the authenticated user's profile details.
userRouter.get("/data", userAuth, getUserData);
// Delete the authenticated user's account and clear the auth cookie.
userRouter.delete("/delete", userAuth, deleteUser);

export default userRouter;
