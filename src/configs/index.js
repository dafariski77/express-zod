import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExp = process.env.JWT_EXP;
export const jwtRefreshExp = process.env.JWT_REFRESH_EXP;
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
export const smtpUsername = process.env.SMTP_USERNAME;
export const smtpPassword = process.env.SMTP_PASSWORD;
export const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
export const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
