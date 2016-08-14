import {expect} from 'chai'
import retroNames from '.'

describe('retro-game-names', () => {
  describe('all', () => {
    it('should return an object of platforms', () => {
      const all = retroNames.all

      expect(all).to.be.an('object')
      expect(all).to.have.all.keys(['snes', 'nes'])
    })

    it('should contain the game `Casper`', () => {
      expect(retroNames.all.snes).to.include('Casper')
    })
  })

  describe('platform', () => {
    it('should return an array of games for the given plarform', () => {
      const games = retroNames.platform('snes')

      expect(games).to.be.instanceof(Array)
      expect(games).to.include('Super Mario World')
    })
  })

  describe('random', () => {
    it('should return a random {title, platform} from retroNames.all', () => {
      const randomItem = retroNames.random()

      expect(retroNames.all[randomItem.platform]).to.include(randomItem.title)
    })

    it('should return a random {title, platform} when given a platform', () => {
      const randomItem = retroNames.random({platform: 'snes'})

      expect(retroNames.all.snes).to.include(randomItem.title)
    })
  })

  describe('find', () => {
    it('should return an object with multiple {platform, [titles]}', () => {
      const foundNames = retroNames.find({title: 'Aero'})

      expect(foundNames.snes).to.include('Aero Fighters')
    })

    it('should return a {platform, [titles]} when given a platform', () => {
      const foundNames = retroNames.find({platform: 'snes', title: 'Battle'})

      expect(foundNames.platform).to.equal('snes')
      foundNames.titles.forEach(function(item) {
        expect(retroNames.all.snes).to.include(item)
      })
    })

    it('should return an error string if a title is not passed', () => {
      const foundNames = retroNames.find()

      expect(foundNames).to.have.string('Error:')
    })
  })
})
