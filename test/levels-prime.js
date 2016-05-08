const logatim = require('../index')

const prime = module.exports = {}

prime.isError = (t) => {
  t.equal(logatim.getLevel(), 'ERROR', 'can persist among files')
}
