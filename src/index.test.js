import {expect} from 'chai'
import retroNames from '.'
import _ from 'underscore'

describe('retro-game-names', () => {
  describe('all', () => {
    it('should return an array of strings', () => {
      expect(retroNames.all).to.satisfy(isArrayOfStrings)
    })

    it('should contain the game `Casper`', () => {
      expect(retroNames.all).to.include('Casper')
    })
  })

  describe('random', () => {
    it('should return a random item from retroNames.all', () => {
      const randomItem = retroNames.random()
      expect(retroNames.all).to.include(randomItem.title)
    });

    it('should return an array of random items if passed a number', () => {
      const randomItems = retroNames.random(3)
      expect(randomItems).to.have.length(3)
      randomItems.forEach(function(item) {
        expect(retroNames.all).to.include(item.title)
      });
    });

    it('should return a random item containing a given string', () => {
      const randomName = retroNames.random('Aero')
      expect(retroNames.all).to.include(randomName.title)
    });
  })

  describe('find', () => {
    it('should return an array of names containing a given string', () => {
      const foundNames = retroNames.find('Aero')
      expect(_.pluck(foundNames, 'title')).to.include('Aero Fighters')
    });

    it('should return an array of names of a maximum given length', () => {
      const foundNames = retroNames.find('Battle', 5)
      expect(foundNames).to.have.length.below(6)
      foundNames.forEach(function(item) {
        expect(retroNames.all).to.include(item.title)
      });
    });
  })
})

function isArrayOfStrings(array) {
  return array.every(i => typeof i === 'string')
}
