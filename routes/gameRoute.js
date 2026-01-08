const { Router } = require('express')
const db = require("../db/queries");
const allLevels = require('../utils/levelCoordinates')

const gameRouter = Router()

// Store character coordinates
const levels = {
    ps2: [
        { name: 'Yuna', xMin: 219, xMax: 298, yMin: 421, yMax: 462 },
        { name: 'James Sunderland', xMin: 341, xMax: 388, yMin: 771, yMax: 811 },
        { name: 'Jak and Daxter', xMin: 856, xMax: 943, yMin: 533, yMax: 598 },
        { name: 'Tommy Vercetti', xMin: 677, xMax: 731, yMin: 602, yMax: 645 },
    ],
    ps1: [
        { name: 'Solid Snake', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Cloud Strife', xMin: 160, xMax: 232, yMin: 507, yMax: 574 },
        { name: 'Leon F. Kennedy', xMin: 641, xMax: 695, yMin: 561, yMax: 615 },
        { name: 'Spyro', xMin: 116, xMax: 249, yMin: 425, yMax: 488 },
     ],
    wii: [
        { name: 'Wii Fit Trainer', xMin: 196, xMax: 239, yMin: 256, yMax: 333 },
        { name: 'Donkey Kong', xMin: 630, xMax: 717, yMin: 680, yMax: 732 },
        { name: 'Rayman', xMin: 616, xMax: 705, yMin: 444, yMax: 496 },
        { name: 'Yarn Kirby', xMin: 145, xMax: 215, yMin: 544, yMax: 579 },
    ],
    snes: [
        { name: 'Link', xMin: 760, xMax: 805, yMin: 449, yMax: 496 },
        { name: 'Megaman X', xMin: 297, xMax: 365, yMin: 626, yMax: 677 },
        { name: 'Terra Branford', xMin: 706, xMax: 778, yMin: 719, yMax: 787 },
        { name: 'Earthworm Jim', xMin: 104, xMax: 184, yMin: 623, yMax: 677 },
    ]
};

// Route to verify a click
gameRouter.post('/verify', (req, res) => {
    const { consoleName, characterName, x, y, screenWidth } = req.body;
    let character
    //const character = levels[consoleName].find(c => c.name === characterName);
    //console.log(screenWidth)
    if(screenWidth > 1400) {
        console.log(`screen is extra extra large at ${screenWidth}px`)
        character = allLevels.levelsXXL[consoleName].find(c => c.name === characterName);
    } else if(screenWidth > 1200 && screenWidth <= 1400) {
        console.log(`screen is extra large at ${screenWidth}px`)
        character = allLevels.levelsXL[consoleName].find(c => c.name === characterName);
    } else if(screenWidth > 992 && screenWidth <= 1200) {
        console.log(`screen is large at ${screenWidth}px`)
        character = allLevels.levelsLG[consoleName].find(c => c.name === characterName);
    } else if(screenWidth > 768 && screenWidth <= 992) {
        console.log(`screen is medium at ${screenWidth}px`)
        character = allLevels.levelsMD[consoleName].find(c => c.name === characterName);
    } else if(screenWidth > 576 && screenWidth <= 768) {
        console.log(`screen is small at ${screenWidth}px`)
        character = allLevels.levelsSM[consoleName].find(c => c.name === characterName);
    } else if(screenWidth < 576) {
        console.log(`screen is extra small at ${screenWidth}px`)
        character = allLevels.levelsXS[consoleName].find(c => c.name === characterName);
    }
    //console.log(allLevels.levelsXXL)

    if (character && x >= character.xMin && x <= character.xMax && y >= character.yMin && y <= character.yMax) {
        res.json({ found: true, characterName });
    } else {
        res.json({ found: false });
    }
});

//fetch character names and found status
gameRouter.get('/names/:consoleName', (req, res) => {
    const { consoleName } = req.params
    const characterNames = levels[consoleName].map(current => current.name)
    let characterNamesAndFound = []
    for(let i = 0; i < characterNames.length; i++) {
        characterNamesAndFound[i] = {id: i, name: characterNames[i], found: false}
    }
    res.json(characterNamesAndFound)
})

//fetch leaderboards
gameRouter.get('/leaderboards/:consoleName', async (req, res) => {
    const { consoleName } = req.params
    const leaderboard = await db.getAllNames(consoleName)
    res.status(201).json(leaderboard)
})

//fetch the slowest
gameRouter.get('/slowest/:consoleName', async (req, res) => {
    const { consoleName } = req.params
    const slowest = await db.getSlowestName(consoleName)
    res.json(slowest)
})

//update leaderboards
gameRouter.put('/leaderboards/:consoleName', async (req, res) => {
    const { consoleName } = req.params
    const { name, time, slowestId } = req.body
    await db.updateLeaderboard(name, time, slowestId)
    res.send(`connection "update" established with console name: ${consoleName}, username: ${name}, time: ${time}, the slowest id: ${slowestId}`)
})

module.exports = gameRouter