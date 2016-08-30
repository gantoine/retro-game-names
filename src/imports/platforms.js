import glob from 'glob'
import path from 'path'

const platforms = {}
const files = glob.sync(path.join(__dirname, '..', 'data', '**', '*.json'))

files.forEach((file) => {
  const name = path.basename(file, '.json')
  platforms[name] = require(path.resolve(file))
})

export default platforms
module.exports = platforms // for CommonJS compatibility
