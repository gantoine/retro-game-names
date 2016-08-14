import uniqueRandomArray from 'unique-random-array'
import retroNames from './retro-game-names.json'
import _ from 'underscore'
import Game from './game.js'

const getRandomItem = uniqueRandomArray(retroNames)

const mainExport = {
  all: retroNames,
  random: random,
  find: find
};

function random(arg) {
  if (arg === undefined) {
    return new Game(getRandomItem())
  } else if (typeof arg === 'string') {
    const foundNames = _.filter(retroNames, (s) => s.includes(arg))
    return new Game(uniqueRandomArray(foundNames)())
  } else {
    const randomItems = [];
    for (let i = 0; i < arg; i++) {
      randomItems.push(new Game(getRandomItem()))
    }
    return randomItems
  }
}

function find(name, number) {
  const foundNames = _.filter(retroNames, (s) => s.includes(name))

  const names = []
  for (let i = 0; i < foundNames.length; i++){
    names.push(new Game(foundNames[i]))
  }

  if (number === undefined) {
    return names
  } else {
    return _.shuffle(names).slice(0, number)
  }
}



export default mainExport
module.exports = mainExport // for CommonJS compatibility
