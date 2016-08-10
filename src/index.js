import uniqueRandomArray from 'unique-random-array'
const snesNames = require('./snes-game-names.json')

const getRandomItem = uniqueRandomArray(snesNames);

const mainExport = {
  all: snesNames,
  random: random
};

function random(number) {
  if (number === undefined) {
    return getRandomItem();
  } else {
    const randomItems = [];
    for (let i = 0; i < number; i++) {
      randomItems.push(getRandomItem());
    }
    return randomItems;
  }
}

export default mainExport
module.exports = mainExport // for CommonJS compatibility
