import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
  sourceMap: true,
  format: 'iife',
  plugins: [
    buble({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};