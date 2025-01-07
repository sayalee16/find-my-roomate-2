import express from "express";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";
import houseRoute from "./routes/houseRoute.js";
import testRoute from "./routes/testRoute.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const corsOptions = {
    origin: ["http://localhost:5173", "https://find-my-roomate.vercel.app/"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options("*", cors()); 

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/houses", houseRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);

const port = 8800;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("Server is listening on port 8800...");
        });
    } catch (err) {
        console.log(err);
    }
};
start();
