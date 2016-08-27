import {expect} from 'chai'
import retroNames from '.'

describe('retro-game-names', () => {
  describe('all', () => {
    it('should return an object of platforms', () => {
      const all = retroNames.all

      expect(all).to.be.an('object')
      expect(all).to.have.any.keys(['amiga_cd32', 'nintendo_wii'])
    })

    it('should contain the game `Casper`', () => {
      expect(retroNames.all.super_nintendo_snes).to.include('Casper')
    })
  })

  describe('platforms', () => {
    it('should return an array of platforms', () => {
      const platforms = retroNames.platforms()

      expect(platforms).to.be.instanceof(Array)
      expect(platforms).to.include('super_nintendo_snes')
    })
  })

  describe('games', () => {
    it('should return an array of games for the given plarform', () => {
      const games = retroNames.games('super_nintendo_snes')

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
      const randomItem = retroNames.random({platform: 'super_nintendo_snes'})

      expect(retroNames.all.super_nintendo_snes).to.include(randomItem.title)
    })

    it('should return a random {title, platform} when given an array of platforms', () => {
      const multiPlatforms = retroNames.all.super_nintendo_snes.concat(retroNames.all.sega_cd)

      const randomItem = retroNames.random({platforms: ['super_nintendo_snes', 'sega_cd']})

      expect(multiPlatforms).to.include(randomItem.title)
    })
  })

  describe('find', () => {
    it('should return an object with multiple {platform, [titles]}', () => {
      const foundNames = retroNames.find({title: 'Aero'})

      expect(foundNames.super_nintendo_snes).to.include('Aero Fighters')
    })

    it('should return a {platform, [titles]} when given a platform', () => {
      const foundNames = retroNames.find({platform: 'super_nintendo_snes', title: 'Battle'})

      expect(foundNames.platform).to.equal('super_nintendo_snes')
      foundNames.titles.forEach((item) => {
        expect(retroNames.all.super_nintendo_snes).to.include(item)
      })
    })

    it('should return a [{platform, [titles]}] when given an array of platforms', () => {
      const multiPlatforms = retroNames.all.super_nintendo_snes.concat(retroNames.all.sega_cd)

      const foundNames = retroNames.find({platforms: ['super_nintendo_snes', 'sega_cd'], title: 'Battle'})

      const keys = Object.keys(foundNames)
      keys.forEach((key) =>{
        expect(['super_nintendo_snes', 'sega_cd']).to.include(key)

        foundNames[key].forEach((item) => {
          expect(multiPlatforms).to.include(item)
        })
      })
    })

    it('should return an error string if a title is not passed', () => {
      const foundNames = retroNames.find()

      expect(foundNames).to.have.string('Error:')
    })
  })
})
