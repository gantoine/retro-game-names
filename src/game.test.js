import Game from './game.js'
import {expect} from 'chai'

describe('game', () => {
  describe('constructor', () => {
    it('should construct a Game with the given title', () => {
      const title = 'Astroboy'

      const game = new Game(title)

      expect(game.title).to.equal(title)
    })
  })

  describe('prettyPrint', () => {
    it('should return an error message if game has not been queried', () => {
      const game = new Game('Mario')
      const message = game.prettyPrint
      expect(message).to.contain('Error')
    })

    it('should return a prettyfied game info string', () => {
      const game = new Game('Mario')
      game.id = 1842
      game.releaseDate = new Date()
      game.platform = 'Super Nintendo (SNES)'

      const message = game.prettyPrint
      expect(message).to.contain('1842:')
      expect(message).to.contain('Mario')
    })
  })

  describe('query', () => {
    it('should query TheGamesDB for game info and return a promise', () => {
      const game = new Game('Mario')
      expect(game.id).to.be.an('undefined')

      const query = game.query()
      query.then(() => {
        expect(game.id).to.not.be.an('undefined')
      })

      expect(query).to.be.a('promise')
    })
  })

  describe('_setInfo', () => {
    it('should set the info on a game, given an array of game data', () => {
      const game = new Game('Mario')
      const data = [
        {
          title: "Astroboy",
          id: 182,
          releaseDate: '1995-06-01T04:00:00.000Z',
          platform: 'Super Nintendo (SNES)'
        },
        {
          title: "Earthworm Jim",
          id: 2873,
          releaseDate: '1996-08-02T06:00:00.000Z',
          platform: 'Super Nintendo (SNES)'
        }
      ]

      game._setInfo(data)

      expect(game.id).to.equal(182)
      expect(game.releaseDate.toJSON()).to.equal('1995-06-01T04:00:00.000Z')
    })
  })
})
