import thegamesdb from 'thegamesdb'

class Game {
  constructor(title) {
    this.title = title
  }

  get prettyPrint() {
    if (this.id){
      return `${this.id}: ${this.title} - ${this.platform} - ${this.releaseDate.getDate()}/${this.releaseDate.getMonth()}/${this.releaseDate.getFullYear()}`
    }
    else {
      return 'Error: no valid ID. Call query() on Game to query from TheGamesDB.'
    }
  }

  /* istanbul ignore next */
  query() {
    return new Promise((resolve, reject) =>
      thegamesdb.getGamesList({ name: this.title, platform: 'Super Nintendo (SNES)'})
        .then((games) => {
          this._setInfo(games)
          resolve(this)
        }).catch(() => {
          reject(this)
        })
    )
  }

  _setInfo(games) {
    const game = games[0]
    this.id = game.id
    this.releaseDate = new Date(game.releaseDate)
    this.platform = game.platform
  }
}

const mainExport = Game
export default mainExport
module.exports = mainExport // for CommonJS compatibility
