import express from "express"
import { GetCurrentUser } from "../controller/user.controller.js"
import isAuth from "../middleware/isAuth.js"

const userRouter = express.Router()

userRouter.get("/me", isAuth, GetCurrentUser)

export default userRouter