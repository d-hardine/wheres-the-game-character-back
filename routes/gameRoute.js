const { Router } = require('express')

const gameRouter = Router()

// Store character coordinates (example data)
const levels = {
    ps2: [
        { name: 'Yuna', xMin: 219, xMax: 298, yMin: 421, yMax: 462 },
        { name: 'James Sunderland', xMin: 263, xMax: 310, yMin: 648, yMax: 684 },
        // Add more characters and coordinates
    ],
    ps1: [
        { name: 'Snake', xMin: 182, xMax: 260, yMin: 400, yMax: 430 },
        { name: 'Cloud', xMin: 263, xMax: 310, yMin: 648, yMax: 684 },
        // Add more characters and coordinates
    ],
    // Add more levels
};

// Route to verify a click
gameRouter.post('/verify', (req, res) => {
    const { levelId, characterName, x, y } = req.body;
    //console.log(levelId, characterName, x, y)
    const character = levels[levelId].find(c => c.name === characterName);

    if (character && x >= character.xMin && x <= character.xMax && y >= character.yMin && y <= character.yMax) {
        res.json({ found: true, characterName });
    } else {
        res.json({ found: false });
    }
});

module.exports = gameRouter