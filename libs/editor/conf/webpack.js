const CKEditorPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const CKEditorStyles = require('@ckeditor/ckeditor5-dev-utils/lib/styles');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: `${__dirname}/../index.ts`,
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'postcss-loader',
            options: CKEditorStyles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          },
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
            compilerOptions: {
              declaration: false,
              outDir: `${process.env.PWD}/platforms/web/@wooportal/editor`,
              target: 'es6'
            }
          }
        }
      }
    ]
  },

  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        extractComments: false,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          mangle: true,
          safari10: true,
          warnings: false,
          compress: {
            ecma: 5,
            passes: 3,
            pure_getters: true
          },
          output: {
            comments: false,
            ecma: 5,
            webkit: true
          }
        }
      })
    ]
  },

  output: {
    filename: 'index.js',
    library: 'InlineEditor',
    libraryTarget: 'umd',
    path: `${process.env.PWD}/platforms/web/@wooportal/editor`
  },

  performance: {
    hints: false
  },

  plugins: [
    new CKEditorPlugin({
      language: require('../package.json').config.language
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
      moduleFilenameTemplate: '[resource-path]',
      sourceRoot: 'webpack:///'
    }),
    ...(process.stderr.isTTY ? [new ProgressPlugin()] : [])
  ],

  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.mjs',
      '.js'
    ]
  },

  stats: {
    assets: true,
    children: false,
    chunkModules: false,
    chunks: true,
    colors: true,
    errorDetails: false,
    errors: true,
    hash: true,
    modules: false,
    moduleTrace: false,
    reasons: false,
    timings: true,
    version: false,
    warnings: false
  }

};
