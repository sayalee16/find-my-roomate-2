import mongoose from "mongoose";

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
