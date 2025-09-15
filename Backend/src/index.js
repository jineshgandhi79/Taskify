import "dotenv/config"
import connectDB from "./db/db-index.js"
import startApp from "./app.js"

connectDB()
    .then(startApp)
    .catch((err)=>console.log(err));