import express from "express";
import userController from "./user.controller.js";

const userRoute = express.Router();

userRoute.use("/auth/user", userController);

export default userRoute;