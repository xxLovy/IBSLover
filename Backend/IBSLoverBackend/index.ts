import mongoose from "mongoose";
import "dotenv/config";
import { PORT, URL } from "./constants/index.js";
import app from "./app.js";

mongoose
    .connect(URL!)
    .then(() => {
        app.listen(PORT!, () => {
            console.log(`The server is open on the port ${PORT} http://127.0.0.1:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('连接失败');
        console.log(error.message);
        process.exit(1);
    });
