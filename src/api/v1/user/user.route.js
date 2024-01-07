import express from "express";
import userController from "./user.controller.js";

const userRoute = express.Router();

userRoute.use("/auth", userController);

export default userRoute;