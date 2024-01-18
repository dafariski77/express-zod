import express from "express";
import refreshTokenController from "./refreshToken.controller.js";

const refreshTokenRoute = express.Router();

refreshTokenRoute.use("/token/refresh", refreshTokenController);

export default refreshTokenRoute;
