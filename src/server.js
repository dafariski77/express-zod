import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import userRoute from "./api/v1/user/user.route.js";
import errorHandlerMiddleware from "./middlewares/handleError.js";
import prisma from "./lib/prisma.js";
import roomRoute from "./api/v1/room/room.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", roomRoute);

app.get("/", (req, res) => {
  return res.json("Hello world");
});

app.use(errorHandlerMiddleware);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async ({ roomId, userId }) => {
    socket.join(roomId);

    const messages = await prisma.chat.findMany({
      where: { roomId },
      include: { user: true },
    });

    io.to(roomId).emit("chatHistory", messages);
  });

  socket.on("sendMessage", async ({ roomId, userId, message }) => {
    const newMessage = await prisma.chat.create({
      data: {
        message,
        roomId,
        userId,
      },
      include: { user: true },
    });

    io.to(roomId).emit("newMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port);

server.on("listening", () => {
  console.log(`Server running on port ${port}`);
});
