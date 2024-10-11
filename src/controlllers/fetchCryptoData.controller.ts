import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import CryptoStatData from '../db/cryptoStat.db';

interface CryptoPriceData {
    usd: number;               
    usd_market_cap: number;     
    usd_24h_change: number;      
}

const fetchCryptoData = async (req?: Request,res?:Response) => { 
    const currency = ["bitcoin", "matic-network", "ethereum"];
    const url = process.env.GECKO_API_URL;
  

    try {
        const response = await axios.get(url, {
            params: {
                ids: currency.join(","),
                vs_currencies: "usd",
                include_market_cap: true,
                include_24hr_change: true,
                x_cg_demo_api_key: process.env.GECKO_API_KEY

            }
        });

       
        const saveData = [];

        for (const [currency, data] of Object.entries(response.data)) {
            
            const priceData = data as CryptoPriceData;
            const cryptoData = {
                currency: currency,
                priceUSD: priceData.usd,  
                marketCapUSD: priceData.usd_market_cap,
                change24h: priceData.usd_24h_change,
            };

            saveData.push(cryptoData);
        }

        

        await CryptoStatData.insertMany(saveData).then(() => { console.log("Data saved successfully") });
        const data = await CryptoStatData.find()
     

        res.status(200).json(data); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default fetchCryptoData;
