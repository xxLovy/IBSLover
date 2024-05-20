import { Router } from "express"
import { getGooglePlaces } from "../controllers/getGooglePlaces"
import { getKeyWords } from "../controllers/getKeywords"
import { getUserCreatedToilets } from "../controllers/getUserCreatedToilets"

const normalRouter = Router()

normalRouter.get(
    "/getGooglePlaces",
    getGooglePlaces
)

normalRouter.get(
    "/getKeywords",
    getKeyWords
)

normalRouter.get(
    "/getUserCreatedToilets",
    getUserCreatedToilets
)

export default normalRouter;