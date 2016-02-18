const $ = require('jquery')
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
const terminals = ['colors', 'levels']

// return the asciinema player options
const getOpts = function (theme) {
  return {
    height: 15,
    loop: 1,
    // autoPlay: autoPlay || 1,
    theme: theme || 'monokai'
  }
}

// make the spotlight demos resizable
const allowResize = function () {
  $('.spotlight[data-benefit="colors"] .demo').resizable({ handles: 'e' })
  $('.spotlight[data-benefit="levels"] .demo').resizable({ handles: 'w' })
}

const loadPlayer = function (terminal) {
  // load the asciinema videos into the demos
  var opts = terminal === 'iso-browser' ? getOpts('solarized-light') : getOpts()
  var name = ['asciinema-', terminal].join('')
  var path = ['asciinema/', terminal, '.json'].join('')

  asciinema_player.core.CreatePlayer(name, path, opts)
}

// listen appendings for auto scrolling
const stalk = function (terminal) {
  var selector = ['#asciinema-', terminal, ' .asciinema-terminal'].join('')
  var element = document.querySelector(selector) // observe need DOM elements
  var $element = $(element)
  var prevY = -1
  var prevX = -1
  var terminalHeight = parseInt(element.style.height)
  var terminalWidth = parseInt(element.parentNode.offsetWidth) - 10

  var stalker = new MutationObserver(function (mutations, observer) {
    var current = mutations[0].target
    var isValid = !['line', 'asciinema-terminal'].indexOf(current.parentNode.className)
    var realTop = current.offsetTop + current.offsetHeight
    var targetY = realTop - terminalHeight
    var targetX = (current.offsetWidth - terminalWidth) + 10

    // scroll Y
    if (targetY !== prevY && isValid) {
      // let Y axis to output multiple lines
      if (targetY < 0) targetY = 0

      // update the prev scoll target
      prevY = targetY

      $element.scrollTo(targetY, {
        axis: 'y',
        duration: targetY > prevY ? 500 : 0
      })
    }

    // scroll x
    if (targetX > 0 && targetX !== prevX && isValid) {
      prevX = targetX

      $element.scrollTo(targetX, {
        axis: 'x',
        duration: 0
      })
    }

    // reset X
    if (prevX > 0 && targetX < prevX) {
      prevX = -1
      $element.scrollTo(0, { axis: 'x' })
    }
  })

  stalker.observe(element, {
    childList: true,
    subtree: true
  })
}

module.exports = (function () {

  allowResize()

  terminals.forEach(function (terminal) {
    loadPlayer(terminal)
    stalk(terminal)
  })
})()
