import { Router } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import UserModel, { IUser } from "../Schema/User";
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const user: IUser = req.body;
    const userFromDB = await UserModel.findOne({ email: user.email }).exec();
    if (!userFromDB) {
      res.status(404).send("User not found");
      return;
    }
    const isValid = await bcrypt.compare(user.password, userFromDB.password);
    if (isValid) {
      const token: string = generateToken(userFromDB);
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
    const user: IUser = req.body;
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = new UserModel(user);

    await newUser.save();
    const token: string = generateToken(newUser);

    res.status(201).send({ token });
    res.status(500).send("Failed to create a user.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
