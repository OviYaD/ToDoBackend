import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUser {
  email: string;
  password: string;
  name: string;
}

const UserSchema = new Schema<IUser>({
  email: String,
  password: String,
  name: String,
});

export default mongoose.model<IUser>("user", UserSchema);
