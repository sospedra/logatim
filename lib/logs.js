'use strict'

const constants = require('./constants')

const logs = module.exports = {}

const log = function (level) {
  let args = Array.prototype.slice.call(arguments, 1)
  let output = args.concat(constants.EOL).join('')

  console[level](output)
}

logs.updateLogMethods = (speaker, logatim, message, currentLevel) => {
  constants.LOG_METHODS.forEach((methodName, idx) => {
    (idx <= currentLevel)
      ? speaker[methodName] = log.bind(null, methodName, message)
      : speaker[methodName] = function noop () {}
  })
}
