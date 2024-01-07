import express from "express";
import { authenticateUser } from "../../../middlewares/auth.js";
import {
  createRoom,
  getAllRooms,
  getOneRoom,
  getUserRooms,
  joinRoom,
  leaveRoom,
} from "./room.service.js";

const route = express.Router();

route.get("/", authenticateUser, async (req, res, next) => {
  try {
    const rooms = await getAllRooms();

    return res
      .json({
        success: true,
        message: "Success get all Rooms",
        data: rooms,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.get("/get/:roomId", authenticateUser, async (req, res, next) => {
  try {
    const room = await getOneRoom(req.params.roomId);

    return res
      .json({
        success: true,
        message: "Success get one room",
        data: room,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.get("/user/:userId", authenticateUser, async (req, res, next) => {
  try {
    const rooms = await getUserRooms(req.params.userId);

    return res
      .json({
        success: true,
        message: "Success get user rooms",
        data: rooms,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.post("/create", authenticateUser, async (req, res, next) => {
  try {
    const room = await createRoom(req.body);

    return res
      .json({
        success: true,
        message: "Success create room",
        data: room,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.post("/join/:roomId", authenticateUser, async (req, res, next) => {
  try {
    const room = await joinRoom({
      userId: req.user.id,
      roomId: req.params.roomId,
    });

    return res
      .json({
        success: true,
        message: "Success join room",
        data: room,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.post("/leave/:roomId", authenticateUser, async (req, res, next) => {
  try {
    const room = await leaveRoom({
      userId: req.user.id,
      roomId: req.params.roomId,
    });

    return res
      .json({
        success: true,
        message: "Success leave room",
        data: room,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

export default route;
