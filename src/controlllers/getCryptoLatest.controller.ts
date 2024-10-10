import { Request, Response } from "express";
import axios from "axios";

const getCrpytoLatest = async(req: Request, res: Response) => {
    try {
        
        const {coin} = req.params;
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
        console.log("res",response.data)
        
        res.status(200).json({message:"Crypto data fetched successfully",data:response.data})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
        
    }
}

export default getCrpytoLatest;