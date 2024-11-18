import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import menuRouter from "./routes/menuRoute.js"
import eventRouter from "./routes/eventRoute.js"
import userRouter from "./routes/userRoute.js"


// app comfig

const app = express()
const port = process.env.Port || 4000

//middleware

app.use(express.json())
app.use(cors())

//db connection

connectDB();

//api endpoint

app.use("/api/menu",menuRouter)
app.use("/api/event",eventRouter)
app.use("/api/user",userRouter)

app.use("/images",express.static('uploads'))



app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://niluban003:Marooned2025@cluster0.07s2f.mongodb.net/?
