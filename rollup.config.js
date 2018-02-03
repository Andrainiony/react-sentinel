import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'react-sentinel',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      babel({
        presets: [
          'react',
          [
            'env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
              },
              modules: false,
            },
          ],
        ],
        plugins: [
          'external-helpers',
          'transform-object-rest-spread',
          'transform-class-properties',
        ],
        babelrc: false,
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['Children', 'PureComponent', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
    ],
  },
  {
    input: 'src/index.js',
    external: ['react', 'react-dom', 'prop-types'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        presets: [
          'react',
          [
            'env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
              },
              modules: false,
            },
          ],
        ],
        plugins: [
          'external-helpers',
          'transform-object-rest-spread',
          'transform-class-properties',
        ],
        babelrc: false,
        exclude: 'node_modules/**',
      }),
    ],
  },
  {
    input: 'example/index.js',
    output: {
      name: 'example',
      file: 'example/bundle.js',
      format: 'iife',
    },
    plugins: [
      postcss({
        plugins: [],
      }),
      babel({
        presets: [
          'react',
          [
            'env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
              },
              modules: false,
            },
          ],
        ],
        plugins: [
          'external-helpers',
          'transform-object-rest-spread',
          'transform-class-properties',
        ],
        babelrc: false,
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['Children', 'Component', 'PureComponent', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
  },
];
