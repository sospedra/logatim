# [Logatim](http://edravis.github.io/logatim/)

[![Build Status](https://travis-ci.org/edravis/logatim.svg?branch=master)](https://travis-ci.org/edravis/logatim)
[![devDependency Status](https://david-dm.org/edravis/logatim/dev-status.svg)](https://david-dm.org/edravis/logatim#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/edravis/logatim/badge.svg?branch=master&service=github)](https://coveralls.io/github/edravis/logatim?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

#### Logatim is an isomorphic logger which implements log levels and ANSI styles.

Finally you can use the same logger for the **server and client side** of your applications. Log for developers using **colors, underlines, etc.** in order to transform the terminal in an authenitc debugger machine. And log for production **managing exactly what have** and what have not **to be outputed**.


## Quick start

Choose one of the following options:

1. Install it **via npm**: `npm install logatim --save`
2. Download from the `dist` folder the **stand-alone specification** which fits better for you: `var`, `commonjs`, `umd` or `amd`.


## Features

* Logatim has **colors**, **background colors** and **text styles**.
* Implements the five **native console logging methods**: trace, debug, info, warn and error.
* Production ready for **server and front-end sides**. Learn one, implement everywhere.
* Super **lightweight**, weighs in at 1.1KB minified and gzipped.
* Implements **human-like** code style: `logatim.green.bold.info('super sexy')`
* By using the native `console` object so you'll **keep the stack trace and line numbers**.
* Works with **multiple Javascript specifications**: AMD, UMD, CommonJS and declaring a `var` directly.


## Server support
* All node versions via `npm`

## Browser support
*(Only the versions which had been introduced the console colors support. We cannot do magic... yet.)*

* Chrome
* Edge
* Firefox 
* Internet Explorer 8+
* Opera
* Vivaldi
* Safari


## Usage
The logatim API is tend to be extremly minimal and human-like. It has two different kind of options: the styling and the leveling ones. Logatim consists in:

### Styles

* Use the **[ANSI styles](https://en.wikipedia.org/wiki/ANSI_escape_code)** in a concatenable way:

```es6
const logatim = require('logatim')

logatim.blue.bgYellow.bold.info("It's like reading english")

// and the next print is completly independent; zero memories
logatim.green.info('No background color nor bold here')

// also, of course you can print without any style
logatim.info("I'm a boring log")

```

* The **colors** available are: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.

* The **background colors** available are: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite.

* The **styles** available are: reset, bold, dim, italic, underline, inverse, hidden, strikethrough.

### Levels
* Use the five `console` native **logging methods** (aka levels):
```es6
const logatim = require('logatim')

// sorted from bottom in the bubbling logging scale
logatim.trace('Good for track pathways')
logatim.info('Good while developing')
logatim.debug('Good for find errors')
logatim.warn('Good for production')
logatim.error('Good for performance')
```
* And change the **current level** using the get/set methods:
```es6
const logatim = require('logatim')

logatim.getLevel() // by default is WARN
logatim.debug("I won't be printed") // because debug is lower than warn
logatim.setLevel('info')
logatim.debug("I'll be printed") // because debug is greater than info
```

* Leveling also ensure that **your logs don't break antyhing**, even if there's not a `console` object (I'm staring to you IE) it will slient fallback to the safest print possible.


## Contributing

Please feel free to raise issues, or make contributions. Remember that we follow standar code style and the continous integration pattern so any pull request should run the tests first.

```bash
git clone https://github.com/edravis/logatim.git
cd logatim
npm install
npm test
# edit logatim

# when done
npm test
npm run build
# send the PR, yaaay!
```

## License
The code is available under the [ISC license](LICENSE.txt).

Handcrafted by [@sospedra\_r](http://twitter.com/sospedra\_r) / [sospedra.me](http://sospedra.me).

With contributions from:
* [be the first here, make a PR!]
