import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { UserAuthRouter } from "./routes/UserAuthRouter";
import cookieParser from "cookie-parser";
import { dbConnect } from "./dbConnect";
import CompanyRouter from "./routes/CompanyRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
config();

app.use("/user", UserAuthRouter)
app.use("/company",CompanyRouter)

dbConnect();

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});