const express = require('express')
const { Client } = require('pg')
require("dotenv").config()

const client = new Client({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

const app = express()

const connectDB = async () => {
    client
    .connect()
    .then(() => {
        console.log("a conexão funcionou")
    })
    .catch((err) => {
        console.log("erro ao conectar na db")
    })
}

app.get('/test-api', function (req, res) {
    res.send('{}')
})

app.listen(3000)
connectDB()