const thegamesdb = require('thegamesdb')
const jsonfile = require('jsonfile')

thegamesdb.getPlatformsList().then(gotPlatforms)

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
