var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'highway': ['./src/index.js']
  },
  output: {
    path: __dirname,
    filename: './dest/[name].min.js'
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
    //'Zepto': 'Zepto'
  },
  devtool: 'source-map',
  plugins: [
    //压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({})
  ]
};
