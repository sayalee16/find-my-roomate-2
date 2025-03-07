import express from "express";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";
import houseRoute from "./routes/houseRoute.js";
import testRoute from "./routes/testRoute.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./db/connect.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors({
    origin: ['https://find-my-roomate-frontend.vercel.app', 'http://localhost:5173','https://findmy-roomate-frontend.vercel.app/'], // List allowed origins
    credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
}));
app.options("*", cors());
// Middlewares
app.use(express.json());
app.use(cookieParser());

// router.get("/", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//    });


// Routes
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/houses", houseRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

const port = 8800;

db.on("connected", () => {
  app.listen(port, () => {
    console.log("Server is listening on port 8800...");
    console.log("db connected");
  })
})

db.on("error", (err) => {
  console.log("mondo error", err);
})
// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => {
//         console.log("db uri :",process.env.MONGO_URI);
//       console.log("Server is listening on port 8800...");
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// start();
