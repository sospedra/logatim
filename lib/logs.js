'use strict'

const constants = require('./constants')
const utils = require('./utils')

let chunking = []

const reset = () => {
  chunking = []
}

const castMessage = (args) => {
  return args.reduce((memo, arg) => {
    if (utils.isObject(arg)) {
      arg = JSON.stringify(arg)
    }

    return `${memo} ${arg}`.trim()
  }, '')
}

const log = function (level, isNode) {
  let message = Array.prototype.slice.call(arguments, 2)
  let output = buildOutput(message, isNode)

  isNode ? console[level](output) : console[level].apply(console, output)

  return reset()
}

const buildOutput = (message, isNode) => {
  message = castMessage(message)
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
  let currentRaw = buildOutput([message || ''], isNode)

  reset()

  return currentRaw
}

logs.updateLogMethods = (speaker, currentLevel, isNode) => {
  constants.LEVELS_KEYS.forEach((level, idx) => {
    level = level.toLowerCase()

    let levelName = level

    // accomodate .debug level for node env (which is an alias of .log)
    if (isNode && level === 'debug') {
      level = 'info'
    }

    ;(idx >= currentLevel)
      ? speaker[levelName] = log.bind(null, level, isNode)
      : speaker[levelName] = function noop () { return reset() }
  })
}
