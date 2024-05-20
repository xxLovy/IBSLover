import cors from "cors";
import express from "express";
import normalRouter from "./routers/fetchInfoRouter";
import toiletRouter from "./routers/changeToiletRouter";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));


app.use("/api/normal", normalRouter);
app.use("/api/toilet", toiletRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

export default app;
