const express = require('express')
const cors = require('cors')
const path = require('node:path')
const gameRoute = require('./routes/gameRoute')

// Load environment variables
//require('dotenv').config();

//express initialization
const app = express()

//cors enabled
app.use(cors())

//access html body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//serve static files from "public/images" directory
app.use('/images', express.static(path.join(__dirname, 'public/images')))

//routes middleware
app.use('/api/', gameRoute)

// Need to require the entire Passport config module so server.js knows about it
//require('./configs/passport')

app.listen(3000, console.log('server started on port 3000'))