const express = require('express')
require("dotenv").config()
const connectDb = require("./db")

const app = express()
connectDb()
app.get('/test-api', function (req, res) {
    res.send('{}')
})

app.listen(3000)