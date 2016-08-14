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
import retro from 'retro-game-names'
```

## The Library

#### retro.all

Return an object of platforms, each with an array of titles
```javascript
{
  nes:
   [titles],
  snes:
   [titles]
}
```

#### retro.platforms()

Returns an array of platform tags
```javascript
const consoles = retro.platforms()
// ['3do', 'amiga', 'acorn_electron', ...]
```

#### retro.games(platform)

Returns an array of titles for the given platform
```javascript
const titles = retro.platform('nes')
// ['10-Yard Fight', '1942', ...]
```

#### retro.random(options = {})

Returns a random game form the game list.
```javascript
const randomGame = retro.random()
// {title: 'Battletoads', platform: 'snes'}
```

The `platform` option can be passed in, which will return a random game from that platform
```javascript
const randomGames = retro.random({platform: 'snes'})
// {title: 'The Adventures of Dr. Franken', platform: 'snes'}
```

#### retro.find(options = {})

The options hash acceps the following:
 - **title** *(required)*: The partial/exact title of the game (case sensitive)
 - **platform** *(optional)*: The tag of the platform ('snes', 'nes', etc.)

Returns an object with multiple {platform, [titles]}
```javascript
const foundGames = retro.find({title: '-1'})
// { nes: [ 'F-117A Stealth Fighter', 'F-15 Strike Eagle' ],
//  snes: [ 'GP-1', 'GP-1: Part II', 'Redline F-1 Racer' ] }
```

Passing a platform in the options returns a single {platform, [titles]}
```javascript
const foundGames = retro.find({title: '-1', platform: 'nes'})
// { platform: 'snes', titles: [ 'GP-1', 'GP-1: Part II', 'Redline F-1 Racer' ] }
```

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
