'use strict'

const utils = module.exports = {}

utils.detectNode = () => {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]'
  } catch (ex) { return false }
}
