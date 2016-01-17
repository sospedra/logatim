'use strict'

const constants = require('./constants')

let chunking = []

const reset = logatim => {
  chunking = []
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
    chunking.reverse().forEach(chunk => {
      let val = chunk.val

      if (chunk.key === 'style') {
        val = constants.STYLES[val].ansi
      }

      message = [val].concat(message)
    })

    message = `${message.join('')}${constants.EOL}`
  } else {
    let styles = chunking.map(chunk => constants.STYLES[chunk.styleName].css)

    message = [['%c'].concat(message).join(' '), styles.join(';')]
  }

  return message
}

const logs = module.exports = {}

logs.addChunk = chunk => chunking.push(chunk)

logs.raw = (isNode, message) => {
  let currentRaw = buildOutput(message, isNode)
  chunking = []

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
