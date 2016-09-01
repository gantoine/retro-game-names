const retro = require("retro-game-names")
console.log(retro.random())
retro.find({title: '-1', platforms: ['super_nintendo_snes', 'sega_cd']})
