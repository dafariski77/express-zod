import express from "express";
import { getUserRefreshToken } from "./refreshToken.service.js";

const route = express.Router();

route.get("/:refreshToken", async (req, res, next) => {
  try {
    const result = await getUserRefreshToken(req.params.refreshToken);

    return res
      .json({
        success: true,
        message: "Success get user refreshToken",
        data: result,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

export default route;
