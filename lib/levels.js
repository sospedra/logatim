'use strict'

const constants = require('./constants')

const levels = module.exports = {}

levels.setLevel = level => {
  if (typeof level === "string" && levels[level.toUpperCase()] !== undefined) {
    level = constants.LEVELS[level.toUpperCase()]
  }

  if (typeof level === "number" && level >= 0 && level <= levels.SILENT) {
    levels.persistLevel(level)
    
    return level
  } else {
    throw "logatim.setLevel() called with invalid level: " + level
  }
}

levels.persistLevel = (levelNum) => {
  let levelName = (constants.LOG_METHODS[levelNum] || 'silent').toUpperCase()
  let sk = constants.STORAGE_KEY
  
  // server side
  GLOBAL[sk] = levelName

  // front side
  // Use localStorage if available
  try {
    window.localStorage[sk] = levelName
    return
  } catch (ignore) {}

  // Use session cookie as fallback
  try {
    window.document.cookie = encodeURIComponent(sk) + "=" + levelName + ";"
  } catch (ignore) {}
}

levels.getPersistedLevel = () => {
  let storedLevel
  let sk = constants.STORAGE_KEY

  // front side
  // try to get it from localStorage
  try {
    storedLevel = window.localStorage[sk]
  } catch (ignore) {}

  // if fails look for it on the cookies document
  if (typeof storedLevel === 'undefined') {
    try {
      let cookie = window.document.cookie
      let location = cookie.indexOf(encodeURIComponent(sk) + "=")

      if (location) storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1]
    } catch (ignore) {}
  }

  // if everything fails return undefined, like nothing happened
  if (constants.LEVELS[storedLevel] === undefined) {
    storedLevel = undefined
  }


  // server side
  storedLevel = GLOBAL[sk]

  return storedLevel
}
