import { Router } from "express";
import { addToilet } from "../controllers/toilet/addToilet";
import { removeToilet } from "../controllers/toilet/removeToilet";
import { editToilet } from "../controllers/toilet/editToilet";
import { voteToilet } from "../controllers/toilet/voteToilet";


const toiletRouter = Router()

toiletRouter.post(
    "addToilet",
    addToilet
)

toiletRouter.patch(
    "editToilet",
    editToilet
)

toiletRouter.delete(
    "removeToilet",
    removeToilet
)

toiletRouter.get(
    "voteToilet",
    voteToilet
)

export default toiletRouter