import mongoose from "mongoose";

var connectDB = (url) => {
  mongoose
  .connect(url)
}
console.log('connected');
export default connectDB;




