import mongoose from "mongoose";
import "dotenv/config";
import { PORT, URL } from "./src/constants/index.js";
import app from "./src/app.js";

mongoose
    .connect(URL!)
    .then(() => {
        app.listen(PORT!, () => {
            console.log(`The server is open on the port ${PORT} http://127.0.0.1:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('connection failed');
        console.log(error.message);
        process.exit(1);
    });
