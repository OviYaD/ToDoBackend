import mongoose from "mongoose";

export async function connectToDatabase() {
  await mongoose.connect(process.env.DB_CONN_URL! + "/" + process.env.DB_NAME!);
  console.log(`Successfully connected to database: `);
}
