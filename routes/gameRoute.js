const { Router } = require('express')

const gameRouter = Router()

gameRouter.get('/:consoleName', (req, res) => {
    const { consoleName } = req.params
    console.log(consoleName)
    res.send('connection established')
})

module.exports = gameRouter