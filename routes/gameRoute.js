const { Router } = require('express')

const gameRouter = Router()

// Store character coordinates
const levels = {
    ps2: [
        { name: 'Yuna', xMin: 219, xMax: 298, yMin: 421, yMax: 462 },
        { name: 'James Sunderland', xMin: 327, xMax: 374, yMin: 766, yMax: 820 },
        { name: 'Jak and Daxter', xMin: 856, xMax: 943, yMin: 533, yMax: 598 },
        { name: 'Tommy Vercetti', xMin: 677, xMax: 731, yMin: 602, yMax: 645 },
    ],
    ps1: [
        { name: 'Solid Snake', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Cloud Strife', xMin: 160, xMax: 232, yMin: 507, yMax: 574 },
        { name: 'Leon F. Kennedy', xMin: 641, xMax: 695, yMin: 561, yMax: 615 },
        { name: 'Spyro', xMin: 116, xMax: 249, yMin: 425, yMax: 488 },
     ],
    wii: [ //coordinate still f'ed
        { name: 'Wii Fit Trainer', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Yarn Kirby', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Donkey Kong', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Rayman', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
    ],
    snes: [ //coordinate still f'ed
        { name: 'Link', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Megaman X', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Terra Branford', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
        { name: 'Earthworm Jim', xMin: 744, xMax: 778, yMin: 472, yMax: 532 },
    ]
};

// Route to verify a click
gameRouter.post('/verify', (req, res) => {
    const { consoleName, characterName, x, y } = req.body;
    const character = levels[consoleName].find(c => c.name === characterName);

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

module.exports = gameRouter