var path = require('path')

module.exports = {
  entry: {
    'highway': ['./src/index.js']
  },
  output: {
    path: __dirname,
    filename: './dest/[name].js'
    //library: 'Highway',
    //libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
          //presets: ['es2015'],
          //plugins: ["transform-class-properties"]
        }
      }
    ]
  },
  externals: {
    'Zepto': 'Zepto'
  },
  devtool: 'source-map'
  //plugins: [
  //  new webpack.DefinePlugin({
  //    'process.env': {
  //      NODE_ENV: '"development"'
  //    }
  //  })
  //],

}
