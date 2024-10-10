import express from "express"
import fetchCryptoData from "../controlllers/fetchCryptoData.controller"
import getCrpytoLatest from "../controlllers/getCryptoLatest.controller"



const router = express.Router()

router.get("/bulk",fetchCryptoData)
//@ts-ignore
router.get("/stats/:coin",getCrpytoLatest)




export default router