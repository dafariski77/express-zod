import BadRequetError from "../../../errors/badRequest.js";
import { compare, encrypt } from "../../../lib/bcrypt.js";
import { createRefreshJWT, createToken } from "../../../lib/jwt.js";
import prisma from "../../../lib/prisma.js";
import { createTokenUser } from "../../../utils/createToken.js";
import generateOtpNumber from "../../../utils/random.js";
import { otpMail } from "../../../utils/sendMail.js";
import { createUserRefreshToken } from "../refreshToken/refreshToken.service.js";

export const loginService = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new BadRequetError("Credential not valid!");
  }

  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new BadRequetError("Invalid password!");
  }

  if (user.isVerified == false) {
    throw new BadRequetError("Account not activated yet!");
  }

  const token = createToken({ payload: createTokenUser(user) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(user) });

  await createUserRefreshToken({
    refreshToken,
    userId: user.id,
  });

  return { token, refreshToken, email: user.email };
};

export const registerService = async (data) => {
  const { fullName, email, password, passwordConfirmation, roleId } = data;

  if (password != passwordConfirmation) {
    throw new BadRequetError("Password not match!");
  }

  const hashPassword = await encrypt(password);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashPassword,
      otp: generateOtpNumber(),
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      otp: true,
      isVerified: true,
      createdAt: true,
    },
  });

  await otpMail(email, user);

  return user;
};

export const verifyService = async (data) => {
  const { otp, email } = data;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new BadRequetError("Invalid User!");
  }

  if (user.isVerified == true) {
    throw new BadRequetError("Account already activated!");
  }

  if (otp != user.otp) {
    throw new BadRequetError("Invalid OTP!");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
    },
  });

  return;
};
