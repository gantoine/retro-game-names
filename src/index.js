import uniqueRandomArray from 'unique-random-array'
const snesNames = require('./snes-game-names.json')

const mainExport = {
  all: snesNames,
  random: uniqueRandomArray(snesNames)
};

export default mainExport
module.exports = mainExport // for CommonJS compatibility
