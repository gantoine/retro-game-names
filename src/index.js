import uniqueRandomArray from 'unique-random-array'
import platforms from './imports/platforms.js'
import _ from 'underscore'

const mainExport = {
  all: platforms,
  info: platformGames,
  platforms: platformList,
  random: random,
  find: find
};

// Returns all info for a platform
function platformGames(platform) {
  return platforms[platform]
}

// Returns an array of platform tags ([3do, amiga, acorn_electron, ...])
function platformList() {
  return Object.keys(platforms)
}

// Returns an object of type {title, tgdb_id, platform}
function random(options = {}) {
  const _platform = options.platform || _randomPlatform(options.platforms)
  const game = uniqueRandomArray(platforms[_platform].titles)()
  return {title: game.title, tgdb_id: game.tgdb_id, platform: _platform}
}

// Returns an object of type {platform, [titles]}
function find(options = {}) {
  if (_.isEmpty(options) || !options.title) {
    return 'Error: You must pass options containing a title (required).'
  } else if (options.platform) {
    const names = _.filter(platforms[options.platform].titles, (g) => _inString(options, g))
    return {platform: options.platform, titles: names}
  } else {
    return _findAll(options)
  }
}

function _findAll(options) {
  const _platforms = _.clone(platforms)
  if (options.platforms) {
    const unwanted = _.difference(Object.keys(_platforms), options.platforms)
    _.each(unwanted, (platform) => delete _platforms[platform])
  }
  const found = _.mapObject(_platforms, (games) => {
    return _.filter(games.titles, (g) => _inString(options, g))
  })
  return _.reduce(found, (memo, value, key) => {
    if (!_.isEmpty(value)) {memo[key] = value}
    return memo
  }, {})
}

function _inString(options, game) {
  if (options.ignoreCase) {
    return game.title.toLowerCase().includes(options.title.toLowerCase())
  } else {
    return game.title.includes(options.title)
  }
}

function _randomPlatform(wanted) {
  const keys = wanted || Object.keys(platforms)
  return uniqueRandomArray(keys)()
}

export default mainExport
module.exports = mainExport // for CommonJS compatibility
