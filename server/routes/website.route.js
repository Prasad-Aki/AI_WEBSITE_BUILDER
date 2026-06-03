import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateWebiste, getWebsiteById } from "../controller/website.controllers.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isAuth, generateWebiste)
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById)

export default websiteRouter