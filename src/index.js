import uniqueRandomArray from 'unique-random-array'
import snesNames from './snes-game-names.json'
import _ from 'underscore'

const getRandomItem = uniqueRandomArray(snesNames)

const mainExport = {
  all: snesNames,
  random: random,
  find: find
};

function random(arg) {
  if (arg === undefined) {
    return getRandomItem();
  } else if (typeof arg === 'string') {
    const foundNames = _.filter(snesNames, (s) => s.includes(arg))
    return uniqueRandomArray(foundNames)()
  }
  else {
    const randomItems = [];
    for (let i = 0; i < arg; i++) {
      randomItems.push(getRandomItem());
    }
    return randomItems;
  }
}

function find(name, number) {
  const foundNames = _.filter(snesNames, (s) => s.includes(name))
  if (number === undefined) {
    return foundNames
  } else {
    return foundNames.slice(0, number)
  }
}

export default mainExport
module.exports = mainExport // for CommonJS compatibility
