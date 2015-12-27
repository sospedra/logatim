const test = require('tape')
const logatim = require('./logatim.tmp.js')

test('get/set methods', function (t) {
  t.plan(4)

  // access to methods
  t.notEqual(logatim.getLevel, undefined, 'has acces to .getLevel()')
  t.notEqual(logatim.setLevel, undefined, 'has acces to .setLevel()')

  // default value
  t.equal(logatim.getLevel(), 'WARN', '.getLevel() by default is 3')

  // set level
  logatim.setLevel('info')
  t.equal(logatim.getLevel(), 'INFO', '.setLevel() can change the current level')
})

test('methods less than the current level should be nooped (not available)', function (t) {
  t.plan(3)

  // different block scope
  t.equal(logatim.getLevel(), 'INFO', '.getLevel() is still INFO in other block scope')

  // greater methods should be available
  t.notEqual(logatim.warn.name, 'noop', '.warn() is greater than INFO an is available')

  // lesser methods should NOT be available (nooped)
  t.equal(logatim.trace.name, 'noop', '.trace() is less than INFO an is NOT available (nooped)')
})
