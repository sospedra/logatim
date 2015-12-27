module.exports = {
  entry: './index.js',
  output: {
    path: './test/',
    filename: 'logatim.tmp.js',
    library: 'logatim',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
}
