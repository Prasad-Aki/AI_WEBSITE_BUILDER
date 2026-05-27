import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
dotenv.config()

const app = express() // created instance of express
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("server started")
    connectDb()
})  // to run server use listen