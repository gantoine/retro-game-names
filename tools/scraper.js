const thegamesdb = require('thegamesdb');
const jsonfile = require('jsonfile');
const fs = require('fs');

const mainExport = {
  missing: missing,
  all: all
};

function missing() {
  thegamesdb.getPlatformsList().then(findMissing)
}

function findMissing(platforms) {
  platforms.forEach((platform) => {
    fs.exists(`./src/data/${platform.alias.split('-').join('_')}.json`, function (exists) {
      if (!exists) {
        thegamesdb.getPlatformGames({ id: platform.id }).then(gotGames.bind(platform))
      }
    });
  })
}

function all() {
  thegamesdb.getPlatformsList().then(gotPlatforms)
}

function gotPlatforms(platforms) {
  platforms.forEach((platform) => {
    thegamesdb.getPlatformGames({ id: platform.id }).then(gotGames.bind(platform))
  })
}

function gotGames(gamesArray) {
  const file = `./src/data/${this.alias.split('-').join('_')}.json`
  const gameNames = []
  gamesArray.forEach(function(game) {
    gameNames.push(game.title)
  })
  jsonfile.writeFileSync(file, gameNames, {spaces: 2}, function (err) {
    console.error(err)
  })
}

module.exports = mainExport // for CommonJS compatibility
