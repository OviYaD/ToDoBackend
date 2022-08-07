import { verifyToken } from "../utils/jwt";

const authMiddleware = async (req: any, res: any, next: any) => {
  console.log("middleware called");
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

export default authMiddleware;
