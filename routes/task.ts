import { Router } from "express";

const task = Router();
task.get("/", async (req, res) => {
  // res.status(200).send(tasks);
});
export default task;
