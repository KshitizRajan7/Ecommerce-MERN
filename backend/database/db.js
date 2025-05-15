import mongoose from "mongoose";

export function connectDB() {
  mongoose.connect(process.env.DB_CONNECT).
    then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.log(err);
    }); // Connect to MongoDB using the connection string from environment variables.
}
