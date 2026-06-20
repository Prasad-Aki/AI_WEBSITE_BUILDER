import express from "express"
import isAuth from "../middleware/isAuth.js"
import { changes, deploy, generateWebsite, getAll, getBySlug, getWebsiteById } from "../controller/website.controllers.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isAuth, generateWebsite)
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById)
websiteRouter.post("/update/:id", isAuth, changes)
websiteRouter.get("/getAll", isAuth, getAll)
websiteRouter.get("/deploy/:id", isAuth, deploy)
websiteRouter.get("/get-by-slug/:slug", getBySlug)

export default websiteRouter