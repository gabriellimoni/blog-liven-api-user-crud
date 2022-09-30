import express from "express";
import userRouter from "./controllers/user-controller.js";

const app = express();

app.use(userRouter);

export default app;
