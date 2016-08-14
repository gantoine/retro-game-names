# retro-game-names

[![travis build](https://img.shields.io/travis/GAntoine/retro-game-names.svg?style=flat-square)](https://travis-ci.org/GAntoine/retro-game-names)
[![codecov coverage](https://img.shields.io/codecov/c/github/GAntoine/retro-game-names.svg?style=flat-square)](https://codecov.io/github/GAntoine/retro-game-names)
[![version](https://img.shields.io/npm/v/retro-game-names.svg?style=flat-square)](http://npm.im/retro-game-names)
[![downloads](https://img.shields.io/npm/dm/retro-game-names.svg?style=flat-square)](http://npm-stat.com/charts.html?package=retro-game-names&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/retro-game-names.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Get random names from retro games!

![retro-game-names](other/snes.gif)

## Installation

This package is distributed via npm:

```
npm install retro-game-names
```

## Usage
```javascript
import games from 'retro-game-names'
```

Most functions will return a [Game](#game) object.
```javascript
Game {id, title, releaseDate, platform}
```

Running `query()` on a `Game` will fetch it's information from thegamesdb.com
```javascript
const mario = games.find('Mario', 1) // Returns a Game
const query = mario.query() // Return a Promise
query.then(() => {
  // Will print the mario Game object, now with id, releaseDate and platform
  console.log(mario)
})
```

## The Library

#### games.all
Return an array *of strings* containing all the games.

#### games.random([arg])

Returns a random game form the game list.
```javascript
const randomGame = games.random()
// Game {title: 'Battletoads'}
```

Passing a *number* as the argument will return an array of random games, of length *arg*.
```javascript
const randomGames = games.random(3)
// [Game {title: 'Alien³'}, Game {title: 'Populous'}, Game {title: 'Football Fury'}]
```

Passing a *string* as the argument will return a random game that contains that string.
```javascript
const randomGame = games.random('Ninja')
// Game {title: 'Ninja Warriors'}
```

#### games.find(name, [length])

Finds all games that contain the given string.
```javascript
const foundGames = games.find('Cool')
// [Game {title: 'Cool Spot'}, Game {title: 'Cool World'}]
```

Passing in a length will limit the size of the returned array.
```javascript
const foundGames = games.find('Cool', 1)
// [Game {title: 'Cool Spot'}]
```

<a name="game"/>

## Game.js - The Game Object

#### constructor()
Constructs a `Game`, given a title
```javascript
const game = new Game('Super Adventure')
// Game {title: "Super Adventure"}
```

#### game.prettyPrint
Returns a single, pretty string with of the game's info
```javascript
const game = new Game('Super Mario World')
game.query().then(() => {
  console.log(game.prettyPrint)
})
// 26095: Super Mario World - Super Nintendo (SNES) - 1/1/2005
```

Note: Passing in an `Game` that hasn't been `query()`-ed will return an error message.
```javascript
const game = new Game('Super Mario World')
console.log(game.prettyPrint)
// 'Error: no valid ID. Call query() on Game to query from TheGamesDB.'
```

#### game.query()
Returns a Promise
```javascript
const game = new Game('Super Mario World')
game.query()
// Promise { <pending> }
```
See the above examples for how to use this promise

## Other

This library was built by following [a workshop](http://kcd.im/fem-oss) for
[Frontend Masters](https://frontendmasters.com).

### Project Setup

This project assumes you have [NodeJS v6](http://nodejs.org/) or greater installed. You should
also have [npm v3](https://www.npmjs.com/) or greater installed as well (this comes packaged
with Node 6). You'll also need a recent version of [git](https://git-scm.com/) installed
as well.

```
npm run setup
```

If you get any failures at this point something is wrong and needs to be fixed. Remember,
[Google](https://google.com) and [StackOverflow](https://stackoverflow.com) are your friends.
