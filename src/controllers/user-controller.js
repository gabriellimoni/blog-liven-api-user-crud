import express from "express";
import UserModel from "../models/user.js";

const router = express.Router();

router.use(express.json());

router.post("/user", async (req, res) => {
  const body = req.body;
  if (!body.email) {
    return res.status(400).json({
      message: "Missing e-mail",
    });
  }

  if (!body.name) {
    return res.status(400).json({
      message: "Missing name",
    });
  }

  const newUser = {
    name: body.name,
    email: body.email,
  };

  const createdUser = await UserModel.create(newUser);

  return res.status(200).json(createdUser);
});

export default router;
