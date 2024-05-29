import { Router } from "express"
import { fetchedDummyGoogleData } from "../constants/dummy";

const testRouter = Router()

testRouter.get("/fetchDummy", (req, res) => {
    res.status(200).json(fetchedDummyGoogleData);
})

export default testRouter