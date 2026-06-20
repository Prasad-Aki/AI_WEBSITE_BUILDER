import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import websiteRouter from "./routes/website.route.js"
import paymentRouter from "./routes/billing.route.js"

const app = express() // created instance of express
const port = process.env.PORT || 5000

app.use(express.json())   // when data comes from frontend in body it is null so we use this middleware then data comes in json format
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/website", websiteRouter)
app.use("/api/payment", paymentRouter)

app.listen(port, () => {
    console.log("server started")
    connectDb()
})  // to run server use listen
