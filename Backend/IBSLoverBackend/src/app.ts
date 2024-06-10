import cors from "cors";
import express from "express";
import normalRouter from "./routers/fetchInfoRouter";
import toiletRouter from "./routers/changeToiletRouter";
import morgan from "morgan";
import testRouter from "./routers/testRouter";
import userRouter from "./routers/userRouter";
import rateLimit from "express-rate-limit";
import { IP_REQUEST_EXPIRE, IP_REQUEST_LIMIT } from "./constants";

const app = express();
const apiLimiter = rateLimit({
    windowMs: IP_REQUEST_EXPIRE * 1000,
    max: IP_REQUEST_LIMIT,
    handler: (req, res) => {
        res.status(429).send('Too many requests from this IP, please try again after a short while.');
    }
});
app.use("/api/normal/getGooglePlaces", apiLimiter);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/normal", normalRouter);
app.use("/api/toilet", toiletRouter);
app.use("/test", testRouter)
app.use("/api/user", userRouter)
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

export default app;
