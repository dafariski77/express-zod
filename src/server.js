import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from "./api/v1/user/user.route.js";
import errorHandlerMiddleware from "./middlewares/handleError.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", userRoute);

app.get("/", (req, res) => {
  return res.json("Hello world");
});

app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
