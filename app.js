import express from "express";
import postRoute from "./routes/postroute.js";
import authRoute from "./routes/authroute.js";
import houseRoute from "./routes/houseRoute.js";
import testRoute from "./routes/testRoute.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(cookieParser()); 

app.use("/api/post", postRoute);

app.use("/api/auth", authRoute);

app.use("/api/houses", houseRoute);

app.use("/api/test", testRoute);

const port = 8800;

var start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log("server is listens to port 8800.....");
        });
    }catch(err){
        console.log(err);
    }
}
start();