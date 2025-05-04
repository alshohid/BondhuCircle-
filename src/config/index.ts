


import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")});

export default{
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL,
    jwt:{
        secret:process.env.SECRET_KEY,
        expires_in:process.env.EXPIRE_DATE  || "1d",
        refresh_secret:process.env.REFRESH_SECRET,
        refresh_expires_in:process.env.REFRESH_EXPIRE  || "7d",
    }
    
   
}