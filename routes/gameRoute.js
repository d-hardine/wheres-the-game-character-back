const { Router } = require('express')

const gameRouter = Router()

gameRouter.get('/test', (req, res) => {
    res.send('connection established')
})

module.exports = gameRouter