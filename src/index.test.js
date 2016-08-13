import {expect} from 'chai'
import snesNames from '.'
import _ from 'underscore'

describe('snes-game-names', () => {
  describe('all', () => {
    it('should return an array of strings', () => {
      expect(snesNames.all).to.satisfy(isArrayOfStrings)
    })

    it('should contain the game `Casper`', () => {
      expect(snesNames.all).to.include('Casper')
    })
  })

  describe('random', () => {
    it('should return a random item from snesNames.all', () => {
      const randomItem = snesNames.random()
      expect(snesNames.all).to.include(randomItem.title)
    });

    it('should return an array of random items if passed a number', () => {
      const randomItems = snesNames.random(3)
      expect(randomItems).to.have.length(3)
      randomItems.forEach(function(item) {
        expect(snesNames.all).to.include(item.title)
      });
    });

    it('should return a random item containing a given string', () => {
      const randomName = snesNames.random('Aero')
      expect(snesNames.all).to.include(randomName.title)
    });
  })

  describe('find', () => {
    it('should return an array of names containing a given string', () => {
      const foundNames = snesNames.find('Aero')
      expect(_.pluck(foundNames, 'title')).to.include('Aero Fighters')
    });

    it('should return an array of names of a maximum given length', () => {
      const foundNames = snesNames.find('Battle', 5)
      expect(foundNames).to.have.length.below(6)
      foundNames.forEach(function(item) {
        expect(snesNames.all).to.include(item.title)
      });
    });
  })
})

function isArrayOfStrings(array) {
  return array.every(i => typeof i === 'string')
}
