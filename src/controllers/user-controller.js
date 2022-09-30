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

router.get("/user", async (_, res) => {
  const users = await UserModel.find();
  return res.status(200).json(users);
});

router.get("/user/:id", async (req, res) => {
  const user = await UserModel.findOne({ id: req.params.id });
  if (!user)
    return res.status(404).send({
      message: "User not found",
    });
  return res.status(200).json(user);
});

router.delete("/user/:id", async (req, res) => {
  const user = await UserModel.findOne({ id: req.params.id });
  if (!user)
    return res.status(404).send({
      message: "User not found",
    });
  await UserModel.deleteOne({ id: req.params.id });
  return res.status(204).send();
});

export default router;
