'use strict'

const constants = require('./constants')
const levels = require('./levels')
const logs = require('./logs')
let isNode = require('detect-node')

let currentLevel = constants.DEFAULT_LEVEL

const logatim = module.exports = str => {
  if (str) logs.addChunk({ key: 'str', val: str })

  const speaker = message => logatim(message)

  // Leveling & options
  speaker.getLevel = () => levels.getLevel(currentLevel)
  speaker.setLevel = (level) => {
    currentLevel = levels.setLevel(level, isNode)
    speaker.raw = logs.raw.bind(null, isNode)
    logs.updateLogMethods(speaker, currentLevel, isNode, logatim)
  }
  speaker.setEnv = (env) => {
    isNode = (env === 'node')
    speaker.raw = logs.raw.bind(null, isNode)
    logs.updateLogMethods(speaker, currentLevel, isNode, logatim)
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
  speaker.setLevel(levels.getPersistedLevel(isNode) || currentLevel)
  logs.updateLogMethods(speaker, currentLevel, isNode, logatim)

  return speaker
}
