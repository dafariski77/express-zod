import NotFoundError from "../../../errors/notFound.js";
import { createToken, isRefreshTokenValid } from "../../../lib/jwt.js";
import prisma from "../../../lib/prisma.js";
import { createTokenUser } from "../../../utils/createToken.js";

export const createUserRefreshToken = async (payload) => {
  const result = await prisma.refreshToken.create({
    data: payload,
  });

  return result;
};

export const getUserRefreshToken = async (refreshToken) => {
  const result = await prisma.refreshToken.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!result) throw new NotFoundError("Invalid refreshToken");

  const payload = isRefreshTokenValid({ token: result.refreshToken });

  const userCheck = await prisma.user.findFirst({
    where: { email: payload.email },
  });

  const token = createToken({ payload: createTokenUser(userCheck) });

  return token;
};
