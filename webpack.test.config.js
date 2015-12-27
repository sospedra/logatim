module.exports = {
  entry: './index.js',
  output: {
    path: './test/',
    filename: `logatim.tmp.js`,
    library: 'logatim',
    libraryTarget: 'umd'
  }
}
