import { Request, Response,NextFunction } from "express";
import axios from "axios";
import CrpytoStatData from "../db/cryptoStat.db";

const getCrpytoLatest = async(req: Request, res: Response):Promise<Response> => {
    const {coin} = req.params;
    try {
        
        if(!coin){
            return res.status(400).json({message:"Coin is required"})
        }

        const response = await axios.get(process.env.GECKO_API_URL,{
            params:{
                ids:coin,
                vs_currencies:"usd",
                include_market_cap:true,
                include_24hr_change:true
            }
        })
       
        
        res.status(200).json({message:"Crypto data fetched successfully",data:response.data})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
        
    }
}

export default getCrpytoLatest;

export async function cryptodeviation(req?:Request,res?:Response){
   try {
    const crypto = req.query.crypto as string;
    if(!crypto){
        return res.status(400).json({message:" Crypto Coin is required"})
    }
    
    const data = await CrpytoStatData.find({currency: crypto})

    let sum = data.reduce((acc,cryptostat)=>acc+cryptostat.priceUSD,0);
    
    const mean = sum/data.length;
    console.log("length",data.length)


    const variance = data.reduce((acc,cryptoData)=> acc+Math.pow(cryptoData.priceUSD-mean,2),0)
   

    let standarddeviation = Math.sqrt(variance/data.length)

    
    res.json({deviation: standarddeviation})
  
   } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "An error occurred while calculating the deviation." })
    
   }
}