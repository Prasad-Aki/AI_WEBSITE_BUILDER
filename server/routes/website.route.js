import express from "express"
import isAuth from "../middleware/isAuth.js"
import { changes, generateWebiste, getAll, getWebsiteById } from "../controller/website.controllers.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isAuth, generateWebiste)
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById)
websiteRouter.post("/update/:id", isAuth, changes)
websiteRouter.get("/getAll", isAuth, getAll)

export default websiteRouter