import uniqueRandomArray from 'unique-random-array'
import platforms from './imports/platforms.js'
import _ from 'underscore'

const mainExport = {
  all: platforms,
  games: platformGames,
  platforms: platformList,
  random: random,
  find: find
};

// Returns an array of titles
function platformGames(platform) {
  return platforms[platform]
}

// Returns an array of platform tags ([3do, amiga, acorn_electron, ...])
function platformList() {
  return Object.keys(platforms)
}

// Returns an object of type {title, platform}
function random(options = {}) {
  const _platform = options.platform || _randomPlatform()
  const game = uniqueRandomArray(platforms[_platform])()
  return {title: game, platform: _platform}
}

// Returns on object of type {platform, [titles]}
function find(options = {}) {
  if (_.isEmpty(options) || !options.title) {
    return 'Error: You must pass options containing a title (required).'
  } else if (options.platform) {
    const names = _.filter(platforms[options.platform], (s) => s.includes(options.title))
    return {platform: options.platform, titles: names}
  } else {
    const found = _.mapObject(platforms, (games) => {
      return _.filter(games, (s) => s.includes(options.title))
    })
    return _.reduce(found, (memo, value, key) => {
      if (!_.isEmpty(value)) {memo[key] = value}
      return memo
    }, {})
  }
}

function _randomPlatform() {
  const keys = Object.keys(platforms)
  return uniqueRandomArray(keys)()
}

export default mainExport
module.exports = mainExport // for CommonJS compatibility
