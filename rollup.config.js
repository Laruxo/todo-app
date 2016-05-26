import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  sourceMap: true,
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        'es2015-rollup'
      ],
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};