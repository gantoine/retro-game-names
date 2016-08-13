import uniqueRandomArray from 'unique-random-array'
import snesNames from './snes-game-names.json'
import _ from 'underscore'
import Game from './game.js'

const getRandomItem = uniqueRandomArray(snesNames)

const mainExport = {
  all: snesNames,
  random: random,
  find: find
};

function random(arg) {
  if (arg === undefined) {
    return new Game(getRandomItem())
  } else if (typeof arg === 'string') {
    const foundNames = _.filter(snesNames, (s) => s.includes(arg))
    return new Game(uniqueRandomArray(foundNames)())
  }
  else {
    const randomItems = [];
    for (let i = 0; i < arg; i++) {
      randomItems.push(new Game(getRandomItem()))
    }
    return randomItems
  }
}

function find(name, number = -1) {
  const foundNames = _.filter(snesNames, (s) => s.includes(name))

  const names = []
  for (let i = 0; i < foundNames.length; i++){
    names.push(new Game(foundNames[i]))
  }
  return names.slice(0, number)
}


export default mainExport
module.exports = mainExport // for CommonJS compatibility
