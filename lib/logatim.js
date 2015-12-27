'use strict'

const ansi = require('ansi-styles')
const levels = require('./levels')
const logs = require('./logs')

let currentLevel = 3

const logatim = module.exports = message => {
  const speaker = str => logatim(message + str)

  // Leveling
  speaker.getLevel = () => currentLevel
  speaker.setLevel = (level) => currentLevel = level

  // Colors
  Object.keys(ansi).forEach(style => {
    Object.defineProperty(speaker, style, {
      get: () => logatim(`${message}${ansi[style].open}`)
    })
  })

  // Refresh reachable methods
  speaker.setLevel(levels.getPersistedLevel() || currentLevel)
  logs.updateLogMethods(speaker, logatim, message, currentLevel)

  return speaker
}
