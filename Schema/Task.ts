import mongoose from "mongoose";
const { Schema } = mongoose;

export interface ITask {
  title: String;
  description: String;
  date: Date;
  status: String;
}

const TaskSchema = new Schema<ITask>({
  title: String,
  description: String,
  date: Date,
  status: String,
});

export default mongoose.model<ITask>("task", TaskSchema);
