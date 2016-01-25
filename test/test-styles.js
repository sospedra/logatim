const test = require('tape')
const logatim = require('./logatim.tmp.js')

const dummies = {
  server: {
    single: '\u001b[31mraw\u001b[49m\u001b[0m',
    last: '\u001b[31m\u001b[34mraw\u001b[49m\u001b[0m',
    set: '\u001b[1m\u001b[32mraw\u001b[49m\u001b[0m',
    bg: '\u001b[34m\u001b[43mraw\u001b[49m\u001b[0m',
    combo: '\u001b[34m\u001b[41m\u001b[1m\u001b[9m\u001b[42m\u001b[37mraw\u001b[49m\u001b[0m',
    concat: '\u001b[31mR\u001b[32mG\u001b[34mB\u001b[49m\u001b[0m'
  },
  browser: {
    single: ['%craw', 'color: #e74c3c'],
    last: ['%craw', 'color: #e74c3c;color: #3498db'],
    set: ['%craw', 'font-weight: 900;color: #2ecc71'],
    bg: ['%craw', 'color: #3498db;background-color: #f1c40f'],
    follow: ['%cfo%cllowme', 'color: #3498db', 'color: #2ecc71;font-weight: 900'],
    empty: ['%cemp%cty', 'color: #3498db', 'font-weight: 900'],
    combo: ['%craw', 'color: #3498db;background-color: #e74c3c;font-weight: 900;text-decoration: line-through;background-color: #2ecc71;color: #fff'],
    concat: ['%cR%cG%cB', 'color: #e74c3c', 'color: #2ecc71', 'color: #3498db']
  }
}

test('browser style', function (t) {
  t.plan(7)

  var single = logatim.red.raw('raw')
  var last = logatim.red.blue.raw('raw')
  var set = logatim.bold.green.raw('raw')
  var bg = logatim.blue.bgYellow.raw('raw')
  var combo = logatim.blue.bgRed.bold.strikethrough.bgGreen.white.raw('raw')
  var concat = logatim.red('R').green('G').blue('B').raw()

  t.equal(single, dummies.server.single, 'can render an ANSI color')
  t.equal(last, dummies.server.last, 'the last color wins')
  t.equal(set, dummies.server.set, 'can render set styles')
  t.equal(bg, dummies.server.bg, 'can render background colors')
  t.equal(combo, dummies.server.combo, 'can styling forever')
  t.equal(concat, dummies.server.concat, 'can concat different styles')
  t.notDeepEqual(concat, logatim, 'and always return a new logatim object')
})

test('server style', function (t) {
  t.plan(9)

  logatim.setEnv('browser')

  var single = logatim.red.raw('raw')
  var last = logatim.red.blue.raw('raw')
  var set = logatim.bold.green.raw('raw')
  var bg = logatim.blue.bgYellow.raw('raw')
  var follow = logatim.blue('fo').green.bold('llow').raw('me')
  var empty = logatim.blue('emp').bold('ty').raw()
  var combo = logatim.blue.bgRed.bold.strikethrough.bgGreen.white.raw('raw')
  var concat = logatim.red('R').green('G').blue('B').raw()

  t.deepEqual(single, dummies.browser.single, 'can render a CSS color')
  t.deepEqual(last, dummies.browser.last, 'the last color wins')
  t.deepEqual(set, dummies.browser.set, 'can render set styles')
  t.deepEqual(bg, dummies.browser.bg, 'can render background colors')
  t.deepEqual(combo, dummies.browser.combo, 'can styling forever')
  t.deepEqual(follow, dummies.browser.follow, 'follow style until next order')
  t.deepEqual(empty, dummies.browser.empty, 'do not add extra elements when level function is empty')
  t.deepEqual(concat, dummies.browser.concat, 'can concat different styles')
  t.notDeepEqual(concat, logatim, 'and always return a new logatim object')
})
