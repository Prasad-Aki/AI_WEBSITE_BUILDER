import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateWebiste } from "../controller/website.controllers.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isAuth, generateWebiste)

export default websiteRouter