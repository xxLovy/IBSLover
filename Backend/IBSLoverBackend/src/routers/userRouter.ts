import { Router } from "express"
import { login } from "../controllers/user/login"
import { getUserInfo } from "../controllers/user/getUserInfo"

const userRouter = Router()

userRouter.get("/login/:kindeId/:username", login)
userRouter.get("/getUser/:kindeId", getUserInfo)

export default userRouter