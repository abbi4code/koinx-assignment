import express, { Router } from "express"
import fetchCryptoData from "../controlllers/fetchCryptoData.controller"
import getCrpytoLatest, { cryptodeviation } from "../controlllers/getCryptoLatest.controller"




const router:Router = express.Router()

router.get("/bulk",fetchCryptoData)
//@ts-ignore
router.get("/stats/:coin", getCrpytoLatest)
//@ts-ignore
router.get("/deviation",cryptodeviation)




export default router