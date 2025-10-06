import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import instrutor from "./Routes/instructorRoute.js";
import router from "./Routes/loginRoutes.js";
import student from "./Routes/studentRoute.js";
import user from "./Routes/userRoute.js";
import authenticate from "./midleware/auth.js";
import userAuth from "./midleware/userAuth.js";
import adminAuth from "./midleware/adminAuth.js";
import studentAuth from "./midleware/studentAuth.js";
import instructorAuth from "./midleware/instuctorAuth.js";
import admin from "./Routes/adminRoute.js"; 
// import temp from "./Routes/tempRoute.js";


dotenv.config();
const app = express();
app.use(json());
app.use("/", router);
app.use("/user/", user);
app.use("/instructor/", authenticate, instructorAuth, instrutor);

app.use("/student/", authenticate, studentAuth, student);
app.use("/admin/", authenticate, adminAuth, admin);

// app.use("/temp/", authenticate, instructorAuth, temp);

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);



mongoose
    .connect("mongodb://mongodb:27017/MyProject1")
    .then(() => {
        console.log(" MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed", error);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port  ${process.env.PORT}`);
});
