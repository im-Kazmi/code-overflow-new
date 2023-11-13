import mongoose from "mongoose";

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);
  try {
    if (!process.env.MONGODB_URI) return console.log("MISSING MONGO URI");
    if (mongoose.connection.readyState === 1) {
      return console.log("connected to database");
    } else {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "code-overflow",
      });
      console.log("connected to database successfuly");
    }
  } catch (error: any) {
    return console.log(error.message);
  }
}
