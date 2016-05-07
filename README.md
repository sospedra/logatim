# [Logatim](http://sospedra.github.io/logatim/)

[![Build Status](https://travis-ci.org/sospedra/logatim.svg?branch=master)](https://travis-ci.org/sospedra/logatim)
[![Coverage Status](https://coveralls.io/repos/github/sospedra/logatim/badge.svg?branch=master)](https://coveralls.io/github/sospedra/logatim?branch=master)
[![devDependency Status](https://david-dm.org/sospedra/logatim/dev-status.svg)](https://david-dm.org/sospedra/logatim#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm](https://img.shields.io/npm/dm/logatim.svg)](https://www.npmjs.org/package/awesome-badges)
[![Code Climate](https://codeclimate.com/github/edravis/logatim/badges/gpa.svg)](https://codeclimate.com/github/edravis/logatim)

#### Logatim is an isomorphic logger which implements log levels and ANSI 16 styles.


Finally you can use the same logger for the **server and client side** of your applications. Log for developers using **colors, underlines, etc.** in order to transform the terminal in an authentic debugger machine. And log for production **managing exactly what have** and what have not **to be outputted**.

## Demo
If you're excited about this and want to try it right now you have 2 options:

1. Copy the [dist/logatim.umd.min.js](dist/logatim.umd.min.js) and paste it on the browser console.
2. Access to our [official sandbox at Runnable](http://code.runnable.com/VrCg6ISZBxFE6SMu/).
3. Go to the [Logatim website](http://sospedra.github.io/logatim/) and open the console :)

## Why?
I've been coding for a long time and I've always feel that we need a better approach to the logging issue. I've researched a lot about the available logger modules and I've even run a [questionary](https://docs.google.com/forms/d/10cZEXVc7aA29JBjoJFsTnTd8tf-RxrwlgusZrg9HW90) about this topic. After this inquiry I think that **the most suitable logger should combines these six elemental features**:

- [ ] 1. **Free outputs**: it should be able to stream the logs anywhere and to multiples targets at the same time.
- [x] 2. **Levels**: it should handle which levels should be printing or not.
- [x] 3. **Styles**: as a very useful resource while developing, it should implements colors, bolds, etc.
- [x] 4. **Cross-platform**: it should run in all the browsers and all the node versions. This includes the different Javascript specifications.
- [x] 5. **Human-like**: it shouldn't have been any learning curve, nor complex configurations; just require and go.
- [ ] 6. **Customizable**: it should accept addons and plugins in order to keep a light and powerful core which can be extended for specific situations.

## Installation

Choose one of the following options:

1. Install it **via npm**: `npm install logatim --save`
2. Download from the `dist` folder the **stand-alone specification** which fits better for you: `var`, `commonjs`, `umd` or `amd`. *Note that the installation via `npm` uses the umd pattern so should work in all the environments.*


## Features

* Logatim has **colors**, **background colors** and **text styles**.
* Implements the five **native console logging methods**: trace, debug, info, warn and error. And also the silent mode.
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
The logatim API is tend to be extremely minimal and human-like. It has two different kind of options: the styling and the leveling ones. Logatim consists in:

### Styles

* Use the **[ANSI 16 styles](https://en.wikipedia.org/wiki/ANSI_escape_code)** in a concatenable way:

```es6
const logatim = require('logatim')

logatim.blue.bgYellow.bold.info("It's like reading english")

// and the next print is completely independent; zero memories
logatim.green.info('No background color nor bold here')

// you can concat different styles
logatim.red('R').green('G').blue('B').info()

// also, of course you can print without any style
logatim.info("I'm a boring log")

```

* The **colors** available are: black, red, green, yellow, blue, magenta, cyan, white, gray and grey (fixing humans).

* The **background colors** available are: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGray and bgGrey.

* The **sets** available are: bold, dim, italic, underline, blink, inverse, hidden, strikethrough (*Almost no browser [supports blink](https://developer.mozilla.org/en/docs/Web/CSS/text-decoration#Browser_compatibility) and inverse is not supported when printing on the browser's console*).

[![asciicast](https://asciinema.org/a/4g8spo2k928hblcuzmhlyrxru.png)](https://asciinema.org/a/4g8spo2k928hblcuzmhlyrxru)

### Levels
* Use the five `console` native **logging methods** (aka levels):

```es6
const logatim = require('logatim')

// sorted from bottom in the bubbling logging scale
logatim.trace('Good for track pathways')
logatim.info('Good while developing')
```

**Note that the log methods are end-like functions. Therefore they are not returning a Logatim instance, so they're not chainable.**

* And change the **current level** using the get/set methods:
```es6
const logatim = require('logatim')

logatim.getLevel() // by default is WARN
logatim.debug("I won't be printed") // because debug is lower than warn
logatim.setLevel('info')
logatim.debug("I'll be printed") // because debug is greater than info
```

* Leveling also ensures that **your logs don't break anything**, even if there's not a `console` object (I'm staring at you IE) it will silent fallback to the safest print possible.

[![asciicast](https://asciinema.org/a/74ohjtrbcx007w3xoaflr6sk9.png)](https://asciinema.org/a/74ohjtrbcx007w3xoaflr6sk9)

## Contributing

Please feel free to raise issues, make contributions or suggestions/requests. Remember that we follow [standard](https://github.com/feross/standard) code style and the continous integration pattern so any pull request should run the tests first.

```bash
git clone https://github.com/edravis/logatim.git
cd logatim
npm install
# edit logatim

# when done
npm test
npm run build
# send the PR, yaaay!
```

### Todo list

If you feel that the force is strong in Logatim keep an eye to the todo list and maybe you find something you're willing to make ;)

* Add the possibility to stream the output elsewhere than the console.
* Add the CI for client-side environments.
* Add Logatim to other source providers: bower, a CDN, etc.
* Write the technical in-code documentation.
* Allow custom prints depending on the level or globally.

## *Dat name, tho*
Logatim comes from a combination of the words **[log](https://en.wikipedia.org/wiki/Logfile)** and **[verbatim](https://en.wiktionary.org/wiki/verbatim)**. The first one is obviously referred to the cutten trunk... lol no, it's for the coding logfiles. And the second one is a Latin term that can be translated as *word for word*. So, the term Logatim could be loosely translated as **log for log**.

## License
The code is available under the [ISC license](LICENSE.txt).

Handcrafted by [@sospedra\_r](http://twitter.com/sospedra\_r) / [sospedra.me](http://sospedra.me).

With [contributions](https://github.com/edravis/logatim/graphs/contributors) from:
* [be the first here, make a PR!]
