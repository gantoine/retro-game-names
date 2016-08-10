# snes-game-names

[![travis build](https://img.shields.io/travis/GAntoine/snes-game-names.svg?style=flat-square)](https://travis-ci.org/GAntoine/snes-game-names)
[![codecov coverage](https://img.shields.io/codecov/c/github/GAntoine/snes-game-names.svg?style=flat-square)](https://codecov.io/github/GAntoine/snes-game-names)
[![version](https://img.shields.io/npm/v/snes-game-names.svg?style=flat-square)](http://npm.im/snes-game-names)
[![downloads](https://img.shields.io/npm/dm/snes-game-names.svg?style=flat-square)](http://npm-stat.com/charts.html?package=snes-game-names&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/snes-game-names.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Get random names from SNES games.

![snes-game-names](other/snes.gif)

## Installation

This package is distributed via npm:

```
npm install snes-game-names
```

## Usage

```javascript
var games = require('snes-game-names');
var allNames = games.all;
var randomName = games.random();
var threeRandomNames = games.random(3);
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
