import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Database is connect with ${connection.host}`);
  } catch (error) {
    console.log("Error Connecting DB!",error);
  }
};

export default connectDB;
