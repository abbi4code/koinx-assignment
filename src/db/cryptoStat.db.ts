import mongoose from "mongoose";


const cryptoSchema = new mongoose.Schema({
    currency: {type:String,required:true},
    priceUSD: {type:Number,required:true},
    marketCapUSD: Number,
    change24h: Number,
    
},{timestamps:true})

const CrpytoStatData = mongoose.model("cryptoData",cryptoSchema)

export default CrpytoStatData