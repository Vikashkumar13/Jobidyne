import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

//CONFIGURE
dotenv.config({});
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = { origin: 'https://jobidyne.netlify.app', credentials: true }
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API'S
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

//LISTENING SERVER
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})