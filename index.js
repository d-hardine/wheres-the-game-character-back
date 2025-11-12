const express = require('express')
const cors = require('cors')
const gameRoute = require('./routes/gameRoute')

// Load environment variables
//require('dotenv').config();

//express initialization
const app = express()

//cors initialization
app.use(cors())

//access html body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes middleware
app.use('/api/', gameRoute)

// Need to require the entire Passport config module so server.js knows about it
//require('./configs/passport')

app.listen(3000, console.log('server started on port 3000'))