'use strict'

const constants = require('./constants')
const levels = require('./levels')
const logs = require('./logs')
const isNode = (typeof process === 'object' && process.toString() === '[object process]')

let currentLevel = constants.DEFAULT_LEVEL

const logatim = module.exports = () => {
  const speaker = str => logatim(str)

  // Leveling
  speaker.getLevel = () => levels.getLevel(currentLevel)
  speaker.setLevel = (level) => {
    currentLevel = levels.setLevel(level, isNode)
    logs.updateLogMethods(speaker, currentLevel)
  }

  // Colors
  Object.keys(constants.STYLES).forEach(styleName => {
    Object.defineProperty(speaker, styleName, {
      get: () => {
        logs.addStyle(styleName)
        return logatim()
      }
    })
  })

  // Refresh reachable methods
  speaker.setLevel(levels.getPersistedLevel(isNode) || currentLevel)
  logs.updateLogMethods(speaker, currentLevel, isNode, logatim)

  return speaker
}
