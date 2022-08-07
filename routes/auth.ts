import e, { Router } from "express";
import User from "../models/User";
import { collections } from "../services/database";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

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
    if (isValid) {
      const newUser = new User(
        userFromDB?.email,
        userFromDB?.password,
        userFromDB?.name,
        userFromDB?._id
      );
      console.log(newUser);

      const token: string = generateToken(newUser);
      res.status(200).send({ token });
    } else {
      res.status(500).send("Failed to login.");
    }
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

    if (result) {
      const newUser = new User(
        user?.email,
        user?.password,
        user?.name,
        result?.insertedId
      );
      console.log(newUser);

      const token: string = generateToken(newUser);
      res.status(201).send({ token });
    } else {
      res.status(500).send("Failed to create a user.");
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
