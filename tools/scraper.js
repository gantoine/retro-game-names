const fs = require('fs')
const path = require('path')

const thegamesdb = require('thegamesdb')
const jsonfile = require('jsonfile')
const _ = require('underscore')

const blacklist = require(path.resolve('./src/imports/blacklist.json'))

const mainExport = {
  missing: missing,
  all: all,
  console: console
}

function missing() {
  thegamesdb.getPlatformsList().then(findMissing)
}

function findMissing(platforms) {
  platforms.forEach((platform) => {
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
    const platName = platform.alias.split('-').join('_')
    if (!_.contains(blacklist, platName)) {
      thegamesdb.getPlatformGames({ id: platform.id }).then(gotGames.bind(platform))
    }
  })
}

function console(id) {
  thegamesdb.getPlatform({id: id}).then(gotConsole)
}

function gotConsole(info) {
  thegamesdb.getPlatformGames({ id: info.id }).then(gotGames.bind(info))
}

/* eslint-disable no-console, no-invalid-this */
function gotGames(gamesArray) {
  const platformInfo = {
    tgbd_id: this.id,
    tgdb_alias: this.alias,
    name: this.name
  }
  const file = `./src/data/${this.alias.split('-').join('_')}.json`

  const gamesInfo = []
  gamesArray.forEach(function(game) {
    gamesInfo.push({tgdb_id: game.id, title: game.title})
  })

  platformInfo.titles = gamesInfo
  jsonfile.writeFileSync(file, platformInfo, {spaces: 2}, function (err) {
    console.error(err)
  })
}

module.exports = mainExport // for CommonJS compatibility
