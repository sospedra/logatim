'use strict'

const constants = require('./constants')
const levels = require('./levels')
const logs = require('./logs')
const utils = require('./utils')
let isNode = require('./utils').detectNode()

let currentLevel = constants.DEFAULT_LEVEL

// prepare console fallback
if (!isNode) utils.consoleFallback()

const logatim = module.exports = str => {
  if (str && typeof str === 'string') {
    logs.addChunk({ key: 'str', val: str })
  }

  const speaker = message => logatim(message)
  speaker.inspect = () => undefined // don't pollute the REPL

  // Leveling & options
  speaker.getLevel = () => levels.getLevel(currentLevel)
  speaker.setLevel = (level) => {
    currentLevel = levels.setLevel(level, isNode)
    speaker.raw = logs.raw.bind(null, isNode)
    logs.updateLogMethods(speaker, currentLevel, isNode)
  }
  speaker.setEnv = (env) => {
    isNode = (env === 'node')
    speaker.raw = logs.raw.bind(null, isNode)
    logs.updateLogMethods(speaker, currentLevel, isNode)
  }

  Object.keys(constants.STYLES).forEach(styleName => {
    Object.defineProperty(speaker, styleName, {
      get: () => {
        logs.addChunk({ key: 'style', val: styleName })

        return logatim()
      }
    })
  })

  // Get the unformatted message
  speaker.raw = logs.raw.bind(null, isNode)

  // Refresh reachable methods
  let persistedLevel = isNode ? levels.getPersistedLevel(currentLevel) : currentLevel
  speaker.setLevel(persistedLevel)
  logs.updateLogMethods(speaker, currentLevel, isNode)

  return speaker
}
