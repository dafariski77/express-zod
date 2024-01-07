import prisma from "../../../lib/prisma.js";

export const getAllRooms = async () => {
  return await prisma.room.findMany({
    select: {
      id: true,
      name: true,
      chats: true,
    },
  });
};

export const getUserRooms = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      otp: true,
      isVerified: true,
      createdAt: true,
      userRooms: {
        include: {
          rooms: true,
        },
      },
    },
  });
};

export const getOneRoom = async (roomId) => {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      chats: true,
    },
  });
};

export const createRoom = async (data) => {
  const { name } = data;

  return await prisma.room.create({
    data: {
      name,
    },
  });
};

export const joinRoom = async (data) => {
  const { userId, roomId } = data;

  return await prisma.userRoom.create({
    data: {
      roomId,
      userId,
    },
  });
};

export const leaveRoom = async (data) => {
  const { userId, roomId } = data;

  return await prisma.userRoom.deleteMany({
    where: {
      userId,
      roomId,
    },
  });
};
