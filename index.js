require('dotenv').config()
const express = require('express')
const cors = require('cors')

require('./config/db')

const routes = require('./routing/routes')

const cookpediaServer = express()

cookpediaServer.use(cors())

cookpediaServer.use(express.json())

cookpediaServer.use(routes)

PORT = 3000

cookpediaServer.listen(PORT,()=>{
    console.log("Cookpedia server started...");
    
})

cookpediaServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Cookpedia Server Started,waiting for client request</h1>`)
})

