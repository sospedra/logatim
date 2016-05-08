var logatim =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1)();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var constants = __webpack_require__(2);
	var levels = __webpack_require__(3);
	var logs = __webpack_require__(4);
	var isNode = __webpack_require__(5).detectNode();

	var currentLevel = constants.DEFAULT_LEVEL;

	var logatim = module.exports = function (str) {
	  if (str && typeof str === 'string') {
	    logs.addChunk({ key: 'str', val: str });
	  }

	  var speaker = function speaker(message) {
	    return logatim(message);
	  };
	  speaker.inspect = function () {
	    return undefined;
	  }; // don't pollute the REPL

	  // Leveling & options
	  speaker.getLevel = function () {
	    return levels.getLevel(currentLevel);
	  };
	  speaker.setLevel = function (level) {
	    currentLevel = levels.setLevel(level, isNode);
	    speaker.raw = logs.raw.bind(null, isNode);
	    logs.updateLogMethods(speaker, currentLevel, isNode, logatim);
	  };
	  speaker.setEnv = function (env) {
	    isNode = env === 'node';
	    speaker.raw = logs.raw.bind(null, isNode);
	    logs.updateLogMethods(speaker, currentLevel, isNode, logatim);
	  };

	  Object.keys(constants.STYLES).forEach(function (styleName) {
	    Object.defineProperty(speaker, styleName, {
	      get: function get() {
	        logs.addChunk({ key: 'style', val: styleName });

	        return logatim();
	      }
	    });
	  });

	  // Get the unformatted message
	  speaker.raw = logs.raw.bind(null, isNode);

	  // Refresh reachable methods
	  speaker.setLevel(levels.getPersistedLevel(isNode) || currentLevel);
	  logs.updateLogMethods(speaker, currentLevel, isNode, logatim);

	  return speaker;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var constants = module.exports = {};

	constants.DEFAULT_LEVEL = 3; // WARN
	constants.EOL = '\u001b[49m\u001b[0m'; // bgColor and rest of styles
	constants.LEVELS = {
	  TRACE: 0,
	  DEBUG: 1,
	  INFO: 2,
	  WARN: 3,
	  ERROR: 4,
	  SILENT: 5
	};
	constants.LEVELS_KEYS = Object.keys(constants.LEVELS);
	constants.STORAGE_KEY = 'logatimLevel';
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
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var constants = __webpack_require__(2);

	var levels = module.exports = {};

	levels.getLevel = function (level) {
	  return constants.LEVELS_KEYS[level];
	};

	levels.setLevel = function (level, isNode) {
	  if (typeof level === 'string' && constants.LEVELS[level.toUpperCase()] !== undefined) {
	    level = constants.LEVELS[level.toUpperCase()];
	  }

	  if (typeof level === 'number' && level >= 0 && level <= constants.LEVELS.SILENT) {
	    levels.persistLevel(level, isNode);

	    return level;
	  } else {
	    throw new Error('logatim.setLevel() called with invalid level: ' + level);
	  }
	};

	levels.persistLevel = function (levelNum, isNode) {
	  var levelName = constants.LEVELS_KEYS[levelNum] || 'SILENT';
	  var sk = constants.STORAGE_KEY;

	  // server side
	  if (isNode) {
	    GLOBAL[sk] = levelName;
	  } else {
	    // front side
	    // Use localStorage if available
	    try {
	      window.localStorage[sk] = levelName;
	    } catch (ignore) {}

	    // Use session cookie as fallback
	    try {
	      window.document.cookie = encodeURIComponent(sk) + '=' + levelName + ';';
	    } catch (ignore) {}
	  }
	};

	levels.getPersistedLevel = function (isNode) {
	  var storedLevel = void 0;
	  var sk = constants.STORAGE_KEY;

	  // server side
	  if (isNode) {
	    storedLevel = GLOBAL[sk];
	  } else {
	    // front side
	    // try to get it from localStorage
	    try {
	      storedLevel = window.localStorage[sk];
	    } catch (ignore) {}

	    // if fails look for it on the cookies document
	    if (typeof storedLevel === 'undefined') {
	      try {
	        var cookie = window.document.cookie;
	        var location = cookie.indexOf(encodeURIComponent(sk) + '=');

	        if (location) storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	      } catch (ignore) {}
	    }

	    // if everything fails return undefined, like nothing happened
	    if (constants.LEVELS[storedLevel] === undefined) {
	      storedLevel = undefined;
	    }
	  }

	  return storedLevel;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var constants = __webpack_require__(2);

	var chunking = [];

	var reset = function reset() {
	  chunking = [];
	};

	var log = function log(level, isNode, logatim) {
	  var message = Array.prototype.slice.call(arguments, 3).join(' ');
	  var output = buildOutput(message, isNode);

	  isNode ? console[level](output) : console[level].apply(console, output);

	  return reset();
	};

	var buildOutput = function buildOutput(message, isNode) {
	  return isNode ? buildOutputNode([message]) : buildOutputBrowser(message);
	};

	var buildOutputNode = function buildOutputNode(message) {
	  chunking.reverse().forEach(function (chunk) {
	    var val = chunk.val;

	    if (chunk.key === 'style') {
	      val = constants.STYLES[val].ansi;
	    }

	    message = [val].concat(message);
	  });

	  return '' + message.join('') + constants.EOL;
	};

	/**
	 * Return an array as the following:
	 * ['%cMessage1 %cMessage2', 'css style', 'as many as messages']
	 * expressed as:
	 * [ [messages], [styles] ]
	 * The styleHolder variable represents the concatenation of different styles for a single message.
	 */
	var buildOutputBrowser = function buildOutputBrowser(message) {
	  var styles = [];
	  var styleHolder = [];
	  var messages = [];

	  chunking.forEach(function (chunk, idx) {
	    var val = chunk.val;

	    if (chunk.key === 'str') {
	      val = '%c' + val;
	      messages.push(val);

	      // if we stacked styles it's time to append them to the styles array
	      if (styleHolder.length !== 0) {
	        styles.push(styleHolder.join(';'));
	        styleHolder = [];
	      }
	    } else if (chunk.key === 'style') {
	      val = constants.STYLES[val].css;

	      // stack styles
	      styleHolder.push(val);
	    }
	  });

	  // resolve pending styles
	  if (styleHolder.length !== 0) {
	    styles.push(styleHolder.join(';'));
	    styleHolder = [];
	  }

	  // if there's an inputed message add it to the messages array
	  if (message) {
	    var chunk = chunking[chunking.length - 1];

	    // if the message has the same styles as the last message don't add the %c
	    if (chunk && chunk.key === 'style') {
	      message = '%c' + message;
	    }

	    messages.push(message);
	  }

	  return [messages.join('')].concat(styles);
	};

	var logs = module.exports = {};

	logs.addChunk = function (chunk) {
	  return chunking.push(chunk);
	};

	logs.raw = function (isNode, message) {
	  var currentRaw = buildOutput(message, isNode);

	  reset();

	  return currentRaw;
	};

	logs.updateLogMethods = function (speaker, currentLevel, isNode, logatim) {
	  constants.LEVELS_KEYS.forEach(function (level, idx) {
	    level = level.toLowerCase();idx >= currentLevel ? speaker[level] = log.bind(null, level, isNode, logatim) : speaker[level] = function noop() {
	      return reset();
	    };
	  });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var utils = module.exports = {};

	utils.detectNode = function () {
	  try {
	    return Object.prototype.toString.call(global.process) === '[object process]';
	  } catch (ex) {
	    return false;
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);