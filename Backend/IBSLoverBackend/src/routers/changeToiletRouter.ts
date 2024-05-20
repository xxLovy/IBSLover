import { Router } from "express";
import { addToilet } from "../controllers/toilet/addToilet";
import { removeToilet } from "../controllers/toilet/removeToilet";
import { editToilet } from "../controllers/toilet/editToilet";
import { voteToilet } from "../controllers/toilet/voteToilet";


const toiletRouter = Router()

toiletRouter.post("/addToilet/:userId", addToilet);
toiletRouter.patch("/editToilet/:userId/:toiletId", editToilet);
toiletRouter.get("/removeToilet/:userId/:toiletId/:msg", removeToilet);
toiletRouter.get("/voteToilet/:userId/:toiletId", voteToilet);

export default toiletRouter