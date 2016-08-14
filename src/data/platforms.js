import glob from 'glob'
import path from 'path'

const platforms = {}
glob('./src/data/**/*.json', (er, files) => {
  files.forEach((file) => {
    const name = path.basename(file, '.json')
    platforms[name] = require(path.resolve(file))
  })
})

export default platforms
module.exports = platforms // for CommonJS compatibility
