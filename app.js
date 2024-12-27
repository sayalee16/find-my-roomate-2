import express from "express";
import postRoute from "./routes/postroute.js";
import authRoute from "./routes/authroute.js";
import houseRoute from "./routes/houseRoute.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/post", postRoute);

app.use("/api/auth", authRoute);

app.use("/api/houses", houseRoute);

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