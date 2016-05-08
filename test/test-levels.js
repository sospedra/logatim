const test = require('tap').test
const logatim = require('../index')

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

test('switch levels operations', function (t) {
  t.plan(1)

  try {
    // output something change the level and output again
    logatim.warn('IGNORE: first one')
    logatim.info('IGNORE: lower level')
    logatim.setLevel('error')
    logatim.warn('IGNORE: no output')
    logatim.error('IGNORE: highest level')
    logatim.setLevel('info')
    logatim.info('IGNORE: last one')
    logatim.info('IGNORE: reply')

    t.pass('can level without breaking')
  } catch (ex) { t.fail(ex) }
})

test('debug works in node env', function (t) {
  t.plan(1)

  logatim.setLevel('debug')

  try {
    logatim.debug()

    t.pass('can use debug function in node')
  } catch (ex) { t.fail(ex) }
})

test('log methods are end-like functions', function (t) {
  t.plan(5)

  logatim.setLevel(0)

  t.equal(logatim.error(), undefined, '.error() is not chainable')
  t.equal(logatim.warn(), undefined, '.warn() is not chainable')
  t.equal(logatim.info(), undefined, '.info() is not chainable')
  t.equal(logatim.debug(), undefined, '.debug() is not chainable')
  t.equal(logatim.trace(), undefined, '.trace() is not chainable')
})
