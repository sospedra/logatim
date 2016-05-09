'use strict'

const utils = module.exports = {}

utils.isPlainObject = (candidate) => {
  return candidate && typeof candidate === 'object' && !Array.isArray(candidate)
}

utils.detectNode = () => {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]'
  } catch (ex) { return false }
}

utils.consoleFallback = () => {
  const noop = function noop () {}
  const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ]

  let method
  let length = methods.length
  let console = (window.console = window.console || {})

  while (length--) {
    method = methods[length]

    // Only stub undefined methods
    if (!console[method]) console[method] = noop
  }
}
