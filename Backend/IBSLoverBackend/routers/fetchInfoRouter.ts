import { Router } from "express"
import { getGooglePlaces } from "../controllers/fetch/getGooglePlaces"
import { getKeyWords } from "../controllers/fetch/getKeywords"
import { getUserCreatedToilets } from "../controllers/fetch/getUserCreatedToilets"

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