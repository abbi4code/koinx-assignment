import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes"
import cron from "node-cron"
import fetchCryptoData from "./controlllers/fetchCryptoData.controller"

dotenv.config()
const app = express()
const uri:any = process.env.DB_URI 
console.log("uri",uri)

app.use("/api",router)
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello World!")
})


cron.schedule("0 */2 * * *",async()=>{
    try {
        await fetchCryptoData();
        
    } catch (error) {
        console.log(error)
    }
})


app.listen(3000,async()=>{
    try {
        await mongoose.connect(uri,{
            dbName:"koin"
        }).then(()=>{
            console.log("Database connected")
        })
        console.log("Server is running on port 3000")
    } catch (error) {
        console.log(error)
        
    }
})