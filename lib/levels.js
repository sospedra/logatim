'use strict'

const constants = require('./constants')

const levels = module.exports = {}

levels.getLevel = level => constants.LEVELS_KEYS[level]

levels.setLevel = (level, isNode) => {
  if (typeof level === 'string' && constants.LEVELS[level.toUpperCase()] !== undefined) {
    level = constants.LEVELS[level.toUpperCase()]
  }

  if (typeof level === 'number' && level >= 0 && level <= constants.LEVELS.SILENT) {
    levels.persistLevel(level, isNode)

    return level
  } else {
    throw new Error(`logatim.setLevel() called with invalid level: ${level}`)
  }
}

levels.persistLevel = (levelNum, isNode) => {
  let levelName = (constants.LEVELS_KEYS[levelNum] || 'SILENT')
  let sk = constants.STORAGE_KEY

  if (!isNode) {
    // Use localStorage if available
    try {
      window.localStorage[sk] = levelName
    } catch (ignore) {}

    // Use session cookie as fallback
    try {
      window.document.cookie = encodeURIComponent(sk) + '=' + levelName + ';'
    } catch (ignore) {}
  }
}

levels.getPersistedLevel = (currentLevel) => {
  let storedLevel
  let sk = constants.STORAGE_KEY

  // try to get it from localStorage
  try {
    storedLevel = window.localStorage[sk]
  } catch (ignore) {}

  // if fails look for it on the cookies document
  if (typeof storedLevel === 'undefined') {
    try {
      let cookie = window.document.cookie
      let location = cookie.indexOf(encodeURIComponent(sk) + '=')

      if (location) storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1]
    } catch (ignore) {}
  }

  // if everything fails return currentLevel, like nothing happened
  if (constants.LEVELS[storedLevel] === undefined) {
    storedLevel = currentLevel
  }

  return storedLevel
}
