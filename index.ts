import express from "express";
import authRoute from "./routes/auth";

const app = express();

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(5000, () => {
  console.log("Example app listening on port 3000!");
});
