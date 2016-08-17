var path = require('path');

module.exports = {
  entry: {
    'highway': ['./src/index.js']
  },
  output: {
    path: __dirname,
    filename: './dest/highway.js'
  },
  module: {
    //preLoaders: [
    //  {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    //],
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
          presets: ['es2015'],
          "plugins": ["transform-class-properties"]
        }
      }
    ]
  },
  externals: {
    'Zepto': 'Zepto'
  },
  //devtool: 'source-map',

};
