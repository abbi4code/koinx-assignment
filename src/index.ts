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

app.use("/",router)
app.use(express.json())
app.get("/", (req, res) => {
    res.send(`
        <h1>Hi there</h1>
        <p>Welcome to the Cryptocurrency API! Here are the available endpoints:</p>
        <ul>
            <li><strong>GET /stats/:coin</strong> - Returns the latest data about the requested cryptocurrency (e.g., /stats/bitcoin).</li>
            <li><strong>GET /deviation?crypto=<name></strong> - Returns the standard deviation of the price of the requested cryptocurrency for the last 100 records stored in the database (e.g., /deviation?crypto=bitcoin).</li>
        </ul>
    `)
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