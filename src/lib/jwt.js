import jwt from "jsonwebtoken";
import {
  jwtExp,
  jwtRefreshExp,
  jwtRefreshSecret,
  jwtSecret,
} from "../configs/index.js";

export const createToken = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExp,
  });

  return token;
};

export const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: jwtRefreshExp,
  });

  return token;
};

export const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

export const isRefreshTokenValid = ({ token }) =>
  jwt.verify(token, jwtRefreshSecret);
