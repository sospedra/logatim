const constants = module.exports = {}

constants.DEFAULT_LEVEL = 3 // WARN
constants.EOL = '\u001b[49m\u001b[0m' // bgColor and rest of styles
constants.LEVELS = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}
constants.LEVELS_KEYS = Object.keys(constants.LEVELS)
constants.STORAGE_KEY = 'logatimLevel'
constants.STYLES = {
  // sets
  bold: { ansi: '\u001b[1m', css: 'font-weight: 900' },
  dim: { ansi: '\u001b[2m', css: 'opacity: .8' },
  italic: { ansi: '\u001b[3m', css: 'font-style: italic' },
  underline: { ansi: '\u001b[4m', css: 'text-decoration: underline' },
  blink: { ansi: '\u001b[5m', css: 'text-decoration: blink' },
  inverse: { ansi: '\u001b[7m', css: '-moz-filter: invert(100%); -webkit-filter: invert(100%); filter: invert(100%)' },
  hidden: { ansi: '\u001b[8m', css: 'visibility: hidden' },
  strikethrough: { ansi: '\u001b[9m', css: 'text-decoration: line-through' },
  // colors
  black: { ansi: '\u001b[30m', css: 'color: #333' },
  red: { ansi: '\u001b[31m', css: 'color: #e74c3c' },
  green: { ansi: '\u001b[32m', css: 'color: #2ecc71' },
  yellow: { ansi: '\u001b[33m', css: 'color: #f1c40f' },
  blue: { ansi: '\u001b[34m', css: 'color: #3498db' },
  magenta: { ansi: '\u001b[35m', css: 'color: #8e44ad' },
  cyan: { ansi: '\u001b[36m', css: 'color: #00FFFF' },
  white: { ansi: '\u001b[37m', css: 'color: #fff' },
  gray: { ansi: '\u001b[90m', css: 'color: #7f8c8d' },
  grey: { ansi: '\u001b[90m', css: 'color: #7f8c8d' },
  // background colors
  bgBlack: { ansi: '\u001b[40m', css: 'background-color: #333' },
  bgRed: { ansi: '\u001b[41m', css: 'background-color: #e74c3c' },
  bgGreen: { ansi: '\u001b[42m', css: 'background-color: #2ecc71' },
  bgYellow: { ansi: '\u001b[43m', css: 'background-color: #f1c40f' },
  bgBlue: { ansi: '\u001b[44m', css: 'background-color: #3498db' },
  bgMagenta: { ansi: '\u001b[45m', css: 'background-color: #8e44ad' },
  bgCyan: { ansi: '\u001b[46m', css: 'background-color: #00ffff' },
  bgWhite: { ansi: '\u001b[47m', css: 'background-color: #fff' },
  bgGray: { ansi: '\u001b[47m', css: 'background-color: #7f8c8d' },
  bgGrey: { ansi: '\u001b[47m', css: 'background-color: #7f8c8d' }
}
