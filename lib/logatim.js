'use strict'

const constants = require('./constants')
const levels = require('./levels')
const logs = require('./logs')
const isNode = (typeof process === 'object' && process.toString() === '[object process]')

let currentLevel = 3

const logatim = module.exports = message => {
  const speaker = str => logatim(message + str)

  // Leveling
  speaker.getLevel = () => levels.getLevel(currentLevel)

  speaker.setLevel = (level) => {
    currentLevel = levels.setLevel(level, isNode)
    logs.updateLogMethods(speaker, message, currentLevel)
  }

  // Colors
  Object.keys(constants.STYLES).forEach(styleName => {
    // use ansi or css codes depending on the current environment
    let style = isNode 
      ? constants.STYLES[styleName].ansi 
      : constants.STYLES[styleName].css

    Object.defineProperty(speaker, styleName, {
      get: () => logatim(`${message}${style.open}`)
    })
  })

  // Refresh reachable methods
  speaker.setLevel(levels.getPersistedLevel(isNode) || currentLevel)
  logs.updateLogMethods(speaker, message, currentLevel)

  return speaker
}
