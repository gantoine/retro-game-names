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
      expect(retroNames.all.super_nintendo_snes.titles).to.include({title: 'Casper', tgdb_id: 2834})
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
      const games = retroNames.games('super_nintendo_snes').titles

      expect(games).to.be.instanceof(Array)
      expect(games).to.include({title: 'Super Mario World', tgdb_id: 136})
    })
  })

  describe('random', () => {
    it('should return a random {title, tgdb_id, platform} from retroNames.all', () => {
      const randomItem = retroNames.random()

      expect(retroNames.all[randomItem.platform].titles)
        .to.include({title: randomItem.title, tgdb_id: randomItem.tgdb_id})
    })

    it('should return a random {title, tgdb_id, platform} when given a platform', () => {
      const randomItem = retroNames.random({platform: 'super_nintendo_snes'})

      expect(retroNames.all.super_nintendo_snes.titles)
        .to.include({title: randomItem.title, tgdb_id: randomItem.tgdb_id})
    })

    it('should return a random {title, tgdb_id, platform} when given an array of platforms', () => {
      const multiPlatforms = retroNames.all.super_nintendo_snes.titles.concat(retroNames.all.sega_cd.titles)

      const randomItem = retroNames.random({platforms: ['super_nintendo_snes', 'sega_cd']})

      expect(multiPlatforms).to.include({title: randomItem.title, tgdb_id: randomItem.tgdb_id})
    })
  })

  describe('find', () => {
    it('should return an object with multiple {platform, [titles]}', () => {
      const foundNames = retroNames.find({title: 'Aero'})

      expect(foundNames.super_nintendo_snes)
        .to.include({title: 'Aero Fighters', tgdb_id: 203})
    })

    it('should return a {platform, [titles]} when given a platform', () => {
      const foundNames = retroNames.find({platform: 'super_nintendo_snes', title: 'Super Battle'})

      expect(foundNames.platform).to.equal('super_nintendo_snes')
      foundNames.titles.forEach((item) => {
        expect(retroNames.all.super_nintendo_snes.titles)
          .to.include({title: item.title, tgdb_id: item.tgdb_id})
      })
    })

    it('should return a [{platform, [titles]}] when given an array of platforms', () => {
      const multiPlatforms = retroNames.all.super_nintendo_snes.titles.concat(retroNames.all.sega_cd.titles)

      const foundNames = retroNames.find({platforms: ['super_nintendo_snes', 'sega_cd'], title: 'Super Battle'})

      const keys = Object.keys(foundNames)
      keys.forEach((key) =>{
        expect(['super_nintendo_snes', 'sega_cd']).to.include(key)

        foundNames[key].forEach((item) => {
          expect(multiPlatforms).to.include({title: item.title, tgdb_id: item.tgdb_id})
        })
      })
    })

    it('should return case-insensitive results', () => {
      const foundNames = retroNames.find({title: 'Yoshi', ignoreCase: true})

      expect(foundNames.super_nintendo_snes)
        .to.include({title: 'Yoshi\'s Cookie', tgdb_id: 6368})
      expect(foundNames.super_nintendo_snes)
        .to.include({title: 'Panic in Nakayoshi World', tgdb_id: 25235})
    })

    it('should return an error string if a title is not passed', () => {
      const foundNames = retroNames.find()

      expect(foundNames).to.have.string('Error:')
    })
  })
})
