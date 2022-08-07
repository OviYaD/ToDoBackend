import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database";

dotenv.config();
connectToDatabase()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/auth", authRoute);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.listen(5000, () => {
      console.log("Example app listening on port 3000!");
    });
  })
  .catch((err) => {
    console.log("error:" + err);
  });
