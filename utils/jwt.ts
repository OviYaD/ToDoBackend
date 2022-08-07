import User from "../models/User";
import jwt from "jsonwebtoken";

const jwtSecreteKey = process.env.JWT_SECRET_KEY!;

export const generateToken = (user: User) => {
  return jwt.sign(user, jwtSecreteKey);
};

export const verifyToken = (token: string): User | null => {
  return jwt.verify(token, jwtSecreteKey) as User;
};
