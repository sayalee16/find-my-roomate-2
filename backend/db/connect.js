import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

var connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('connected'))
    .catch(err => console.log('Connection failed', err));
}

export default connectDB;
