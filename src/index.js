import uniqueRandomArray from 'unique-random-array'
import platforms from './data/platforms.js'
import _ from 'underscore'

const mainExport = {
  all: platforms,
  platform: platform,
  random: random,
  find: find
};

function platform(console) {
  return platforms[console]
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
    return _.mapObject(platforms, (games) => {
      return _.filter(games, (s) => s.includes(options.title))
    })
  }
}

function _randomPlatform() {
  const keys = Object.keys(platforms)
  return uniqueRandomArray(keys)()
}

export default mainExport
module.exports = mainExport // for CommonJS compatibility
