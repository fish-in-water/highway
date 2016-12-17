import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';
var uglify = require('rollup-plugin-uglify');

export default {
  entry: 'src/index.js',
  plugins: [babel(babelrc({})), uglify()], //, uglify()
  dest: 'dest/highway.min.js',
  sourceMap: true
};
