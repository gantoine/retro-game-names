const fs = require('fs')
const path = require('path')

const thegamesdb = require('thegamesdb')
const jsonfile = require('jsonfile')
const _ = require('underscore')

const blacklist = require(path.resolve('./src/imports/blacklist.json'))

const mainExport = {
  missing: missing,
  all: all
}

function missing() {
  thegamesdb.getPlatformsList().then(findMissing)
}

function findMissing(platforms) {
  platforms.forEach((platform) => {
    console.log(platform)
    const platName = platform.alias.split('-').join('_')
    fs.exists(`./src/data/${platName}.json`, function (exists) {
      if (!exists && !_.contains(blacklist, platName)) {
        thegamesdb.getPlatformGames({ id: platform.id }).then(gotGames.bind(platform))
      }
    })
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
