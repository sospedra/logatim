const test = require('tap').test
const constants = require('../lib/constants')
const logatim = require('../index')

const CustomError = function CustomError (message) {
  Error.captureStackTrace(this)

  this.message = message
  this.name = 'CustomError'
}

CustomError.prototype = Object.create(Error.prototype)

const dummies = {
  customError: {
    'message': 'Logatim!',
    'name': 'CustomError'
  },
  simpleObject: {
    'cool': 1337,
    'loga': 'tim'
  },
  listObject: [1, 3, 3, 7],
  deepObject: { 'go':
    {'more':
      [ 1, 2, {
        'deeper': 'FTW',
        'loga': ['t', 'i', 'm']
      }
    ]}
  }
}

const getDummy = (key) => {
  return `${JSON.stringify(dummies[key])}${constants.EOL}`
}

test('can print custom errors', function (t) {
  t.plan(1)

  try { throw new CustomError('Logatim!') } catch (ex) {
    t.equal(logatim.raw(ex), getDummy('customError'), 'with all the variables')
  }
})

test('can print objects', function (t) {
  t.plan(3)

  t.equal(logatim.raw(dummies.simpleObject), getDummy('simpleObject'), ' without leveling')
  t.equal(logatim.raw(dummies.listObject), getDummy('listObject'), ' array-like')
  t.equal(logatim.raw(dummies.deepObject), getDummy('deepObject'), ' with a deep nesting')
})

// use custom functions
