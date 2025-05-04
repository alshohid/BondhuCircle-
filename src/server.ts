import mongoose from "mongoose"
import config from "./config/index"
import app from "./app"


const databaseConnection =async()=>{
    try {
        await mongoose.connect(config.database_url as string)
        console.log("Database is connected Successully")
        app.listen(config.port,()=>{
            console.log(`Your App is running port ${config.port}`)
        })
        
    } catch (error) {
        console.log('Failed to connect database',error)
    }

}
databaseConnection()