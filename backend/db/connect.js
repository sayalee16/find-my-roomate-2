import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log('Connection failed', err));
};


export default connectDB;
