import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("Mongo DB connected");
  } catch (err) {
    console.log("Error connecting to MongoDB " + err);
  }
};

export default connectDB;
