const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')

const app = express()
app.use(express.json())
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Server connected to Database"))
    .catch((error) => console.error("Something went wrong while connecting Database!"))

app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log("Server  is running on port : 8800!")
})