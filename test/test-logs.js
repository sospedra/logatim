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
  customError: `{"message":"Logatim!","name":"CustomError"}`,
  simpleObject: `{"cool":1337,"loga":"tim"}`,
  deepObject: `{"go":{"more":[1,2,{"deeper":"FTW","loga":["t","i","m"]}]}}`,
  listObject: '[1,3,3,7]'
}

const getDummy = (key) => `${dummies[key]}${constants.EOL}`

test('can print custom errors', function (t) {
  t.plan(1)

  try { throw new CustomError('Logatim!') } catch (ex) {
    t.equal(logatim.raw(ex), getDummy('customError'), 'with all the variables')
  }
})

test('can print objects', function (t) {
  t.plan(3)

  const simple = {
    cool: 1337,
    loga: 'tim'
  }

  const deep = {
    go: {
      more: [1, 2, {
        deeper: "FTW",
        loga: ['t', 'i', 'm']
      }]
    }
  }

  const list = [1, 3, 3, 7]

  t.equal(logatim.raw(simple), getDummy('simpleObject'), ' without leveling')
  t.equal(logatim.raw(deep), getDummy('deepObject'), ' with a deep nesting')
  t.equal(logatim.raw(list), getDummy('listObject'), ' array-like')
})

// use custom functions
