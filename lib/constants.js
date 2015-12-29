module.exports = {
  DEFAULT_LEVEL: 'WARN',
  EOL: '\u001b[49m\u001b[0m',
  LOG_METHODS: ['trace', 'debug', 'info', 'warn', 'error'],
  STORAGE_KEY: 'logatimLevel',
  LEVELS: {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    SILENT: 5
  },
  STYLES: {
    bold: {
      ansi: { open: '\u001b[1m', close: '\u001b[22m' },
      css: { open: '\u001b[1m', close: '\u001b[22m' }
    },
    dim: {
      ansi: { open: '\u001b[2m', close: '\u001b[22m' },
      css: { open: '\u001b[2m', close: '\u001b[22m' }
    },
    italic: {
      ansi: { open: '\u001b[3m', close: '\u001b[23m' },
      css: { open: '\u001b[3m', close: '\u001b[23m' }
    },
    underline: {
      ansi: { open: '\u001b[4m', close: '\u001b[24m' },
      css: { open: '\u001b[4m', close: '\u001b[24m' }
    },
    inverse: {
      ansi: { open: '\u001b[7m', close: '\u001b[27m' },
      css: { open: '\u001b[7m', close: '\u001b[27m' }
    },
    hidden: {
      ansi: { open: '\u001b[8m', close: '\u001b[28m' },
      css: { open: '\u001b[8m', close: '\u001b[28m' }
    },
    strikethrough: {
      ansi: { open: '\u001b[9m', close: '\u001b[29m' },
      css: { open: '\u001b[9m', close: '\u001b[29m' }
    },
    black: {
      ansi: { open: '\u001b[30m', close: '\u001b[39m' },
      css: { open: '\u001b[30m', close: '\u001b[39m' }
    },
    red: {
      ansi: { open: '\u001b[31m', close: '\u001b[39m' },
      css: { open: '\u001b[31m', close: '\u001b[39m' }
    },
    green: {
      ansi: { open: '\u001b[32m', close: '\u001b[39m' },
      css: { open: '\u001b[32m', close: '\u001b[39m' }
    },
    yellow: {
      ansi: { open: '\u001b[33m', close: '\u001b[39m' },
      css: { open: '\u001b[33m', close: '\u001b[39m' }
    },
    blue: {
      ansi: { open: '\u001b[34m', close: '\u001b[39m' },
      css: { open: '\u001b[34m', close: '\u001b[39m' }
    },
    magenta: {
      ansi: { open: '\u001b[35m', close: '\u001b[39m' },
      css: { open: '\u001b[35m', close: '\u001b[39m' }
    },
    cyan: {
      ansi: { open: '\u001b[36m', close: '\u001b[39m' },
      css: { open: '\u001b[36m', close: '\u001b[39m' }
    },
    white: {
      ansi: { open: '\u001b[37m', close: '\u001b[39m' },
      css: { open: '\u001b[37m', close: '\u001b[39m' }
    },
    gray: {
      ansi: { open: '\u001b[90m', close: '\u001b[39m' },
      css: { open: '\u001b[90m', close: '\u001b[39m' }
    },
    grey: {
      ansi: { open: '\u001b[90m', close: '\u001b[39m' },
      css: { open: '\u001b[90m', close: '\u001b[39m' }
    },
    bgBlack: {
      ansi: { open: '\u001b[40m', close: '\u001b[49m' },
      css: { open: '\u001b[40m', close: '\u001b[49m' }
    },
    bgRed: {
      ansi: { open: '\u001b[41m', close: '\u001b[49m' },
      css: { open: '\u001b[41m', close: '\u001b[49m' }
    },
    bgGreen: {
      ansi: { open: '\u001b[42m', close: '\u001b[49m' },
      css: { open: '\u001b[42m', close: '\u001b[49m' }
    },
    bgYellow: {
      ansi: { open: '\u001b[43m', close: '\u001b[49m' },
      css: { open: '\u001b[43m', close: '\u001b[49m' }
    },
    bgBlue: {
      ansi: { open: '\u001b[44m', close: '\u001b[49m' },
      css: { open: '\u001b[44m', close: '\u001b[49m' }
    },
    bgMagenta: {
      ansi: { open: '\u001b[45m', close: '\u001b[49m' },
      css: { open: '\u001b[45m', close: '\u001b[49m' }
    },
    bgCyan: {
      ansi: { open: '\u001b[46m', close: '\u001b[49m' },
      css: { open: '\u001b[46m', close: '\u001b[49m' }
    },
    bgWhite: {
      ansi: { open: '\u001b[47m', close: '\u001b[49m' },
      css: { open: '\u001b[47m', close: '\u001b[49m' }
    }
  } 
}
