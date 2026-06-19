import express from "express"
import isAuth from "../middleware/isAuth.js"
import { billing, verifyPayment } from "../controller/billing.controller.js"

const paymentRouter = express.Router()

paymentRouter.post("/billing", isAuth, billing)
paymentRouter.post("/verify", isAuth, verifyPayment)

export default paymentRouter