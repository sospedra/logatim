'use strict'

const constants = require('./constants')

let chunking = []

const reset = logatim => {
  chunking = []
  return logatim()
}

const log = function (level, isNode, logatim) {
  let message = Array.prototype.slice.call(arguments, 3).join(' ')
  let output = buildOutput(message, isNode)

  if (isNode) {
    level = level === 'debug' ? 'log' : level
  }

  isNode ? console[level](output) : console[level].apply(console, output)

  return reset(logatim)
}

const buildOutput = (message, isNode) => {
  return isNode ? buildOutputNode([message]) : buildOutputBrowser(message)
}

const buildOutputNode = message => {
  chunking.reverse().forEach(chunk => {
    let val = chunk.val

    if (chunk.key === 'style') {
      val = constants.STYLES[val].ansi
    }

    message = [val].concat(message)
  })

  return `${message.join('')}${constants.EOL}`
}

/**
 * Return an array as the following:
 * ['%cMessage1 %cMessage2', 'css style', 'as many as messages']
 * expressed as:
 * [ [messages], [styles] ]
 * The styleHolder variable represents the concatenation of different styles for a single message.
 */
const buildOutputBrowser = message => {
  let styles = []
  let styleHolder = []
  let messages = []

  chunking.forEach((chunk, idx) => {
    let val = chunk.val

    if (chunk.key === 'str') {
      val = `%c${val}`
      messages.push(val)

      // if we stacked styles it's time to append them to the styles array
      if (styleHolder.length !== 0) {
        styles.push(styleHolder.join(';'))
        styleHolder = []
      }
    } else if (chunk.key === 'style') {
      val = constants.STYLES[val].css

      // stack styles
      styleHolder.push(val)
    }
  })

  // resolve pending styles
  if (styleHolder.length !== 0) {
    styles.push(styleHolder.join(';'))
    styleHolder = []
  }

  // if there's an inputed message add it to the messages array
  if (message) {
    let chunk = chunking[chunking.length - 1]

    // if the message has the same styles as the last message don't add the %c
    if (chunk && chunk.key === 'style') {
      message = `%c${message}`
    }

    messages.push(message)
  }

  return [messages.join('')].concat(styles)
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
