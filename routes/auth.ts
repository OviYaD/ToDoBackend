import { Router } from "express";
import User from "../models/User";
import { collections } from "../services/database";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const user = req.body as User;
    console.log(user);
    // user.password = await bcrypt.hash(user.password, 10);
    const userFromDB = await collections.users?.findOne({ email: user.email });
    console.log(user.password, userFromDB?.password);
    // const result = await collections.users?.findOne(user);
    const isValid = await bcrypt.compare(user.password, userFromDB?.password);
    isValid
      ? res.status(201).send("authenticated")
      : res.status(500).send("Failed to login.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = req.body as User;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await collections.users?.insertOne(user);

    result
      ? res.status(201).send(result)
      : res.status(500).send("Failed to create a user.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
