import { IUser } from "../Schema/User";
import jwt from "jsonwebtoken";

export const generateToken = (user: IUser) => {
  const jwtSecreteKey = process.env.JWT_SECRET_KEY!;
  return jwt.sign({ user }, jwtSecreteKey);
};

export const verifyToken = (token: string): any => {
  const jwtSecreteKey = process.env.JWT_SECRET_KEY!;
  return jwt.verify(token, jwtSecreteKey);
};
