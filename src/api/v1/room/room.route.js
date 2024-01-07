import express from "express";
import roomController from "./room.controller.js";

const roomRoute = express.Router();

roomRoute.use("/room", roomController);

export default roomRoute;
