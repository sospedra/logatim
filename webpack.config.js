const webpack = require("webpack")

module.exports = {
  entry: './assets/js/index.js',
  output: {
    path: 'public/js',
    filename: 'logatim.min.js',
    library: 'logatim'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
