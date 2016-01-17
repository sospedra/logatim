'use strict'

const constants = require('./constants')

let styling = []

const reset = logatim => {
  styling = []
  return logatim()
}

const log = function (level, isNode, logatim) {
  let message = Array.prototype.slice.call(arguments, 3)
  let output = buildOutput(message, isNode)

  isNode ? console[level](output) : console[level].apply(console, output)

  return reset(logatim)
}

const buildOutput = (message, isNode) => {
  if (isNode) {
    styling.reverse().forEach(styleName => {
      let style = constants.STYLES[styleName].ansi
      message = [style].concat(message)
    })

    message = `${message.join('')}${constants.EOL}`
  } else {
    let styles = styling.map(styleName => constants.STYLES[styleName].css)

    message = [['%c'].concat(message).join(' '), styles.join(';')]
  }

  return message
}

const logs = module.exports = {}

logs.addStyle = styleName => styling.push(styleName)

logs.raw = (isNode, message) => {
  let currentRaw = buildOutput(message, isNode)
  styling = []

  return currentRaw
}

logs.updateLogMethods = (speaker, currentLevel, isNode, logatim) => {
  constants.LEVELS_KEYS.forEach((level, idx) => {
    level = level.toLowerCase()

    ;(idx >= currentLevel)
      ? speaker[level] = log.bind(null, level, isNode, logatim)
      : speaker[level] = function noop () { return reset(logatim) }
  })
}
