const test = require('tape')
const logatim = require('./logatim.tmp.js')

const dummies = {
  server: {
    red: '\u001b[31mraw\u001b[49m\u001b[0m',
    last: '\u001b[31m\u001b[34mraw\u001b[49m\u001b[0m',
    set: '\u001b[1m\u001b[32mraw\u001b[49m\u001b[0m',
    bg: '\u001b[34m\u001b[43mraw\u001b[49m\u001b[0m',
    combo: '\u001b[34m\u001b[41m\u001b[1m\u001b[9m\u001b[42m\u001b[37mraw\u001b[49m\u001b[0m'
  }
}

test('server style tests', function (t) {
  t.plan(6)

  var single = logatim.red.raw('raw')
  var last = logatim.red.blue.raw('raw')
  var set = logatim.bold.green.raw('raw')
  var bg = logatim.blue.bgYellow.raw('raw')
  var combo = logatim.blue.bgRed.bold.strikethrough.bgGreen.white.raw('raw')
  var concat = logatim.blue.warn('concat')

  t.equal(single, dummies.server.red, 'can render an ANSI color')
  t.equal(last, dummies.server.last, 'the last color wins')
  t.equal(set, dummies.server.set, 'can render set styles')
  t.equal(bg, dummies.server.bg, 'can render backround colors')
  t.equal(combo, dummies.server.combo, 'can styling forever')
  t.notDeepEqual(concat, logatim, 'can concat different styles')
})
