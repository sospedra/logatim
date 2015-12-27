module.exports = {
  DEFAULT_LEVEL: 'WARN',
  EOL: '\u001b[49m\u001b[0m', 
  LOG_METHODS: ["trace", "debug", "info", "warn", "error"],
  STORAGE_KEY: 'logatimLevel',
  LEVELS: {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    SILENT: 5
  }
}
