'use strict'

const ansi = require('ansi-styles')
const loglevel = require('loglevel')
const levels = ['trace', 'debug', 'info', 'warn', 'error']
const eol = '\u001b[0m'

ansi.line = { open: '\n', close: '' }
ansi.tab = { open: '\t', close: '' }


const klint = module.exports = (function klint (s, open) {
  const speaker = str => {
    return (str === undefined) 
      ? speaker.transform() 
      : klint(s + str + ansi.reset.close)
  }

  const log = function (level, logger) {
    let args = [].slice.call(arguments, 0).slice(1)

    return (typeof logger === 'function')
      ? logger.apply(s, args)
      : loglevel[level].apply(loglevel, [s].concat(args).concat([eol]))
  }

  speaker.transform = () => (open) ? s + ansi.reset.close : s
  speaker.setLevel = loglevel.setLevel

  levels.forEach(level => speaker[level] = log.bind(klint, level))

  Object.defineProperty(speaker, 'string', {
    get: () => speaker.transform()
  })

  Object.keys(ansi).forEach(style => {
    Object.defineProperty(speaker, style, {
      get: () => klint(s + ansi[style].open, open)
    })
  })

  return speaker
}(''))
