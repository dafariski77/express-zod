import express from "express";
import validate from "../../../middlewares/validate.js";
import { loginSchema, registerSchema, verifySchema } from "./user.schema.js";
import {
  loginService,
  registerService,
  verifyService,
} from "./user.service.js";

const route = express.Router();

route.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const user = await loginService(req.body);

    return res
      .json({
        status: "success",
        message: "Login success",
        data: user,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const user = await registerService(req.body);

    return res
      .json({
        status: "success",
        message: "Register success",
        data: user,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

route.post("/verify", validate(verifySchema), async (req, res, next) => {
  try {
    const verify = await verifyService(req.body);

    return res
      .json({
        success: true,
        message: "Account activated!",
        data: verify,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

export default route;
