const createVariants = require('parallel-webpack').createVariants

const createConfig = options => ({
  entry: './index.js',
  output: {
    path: './dist/',
    filename: `logatim.${options.target}.min.js`,
    library: 'logatim',
    libraryTarget: options.target
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
})

const variants = createVariants({
  target: ['var', 'commonjs2', 'amd', 'umd']
}, createConfig) 

module.exports = variants