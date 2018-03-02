const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const autoprefixer = require('autoprefixer');

/* Setup */
const IS_PRODUCTION = process.argv.indexOf('-p') > -1;
const NAME_SUFFIX = new Date().getTime() + (IS_PRODUCTION ? '.min' : '');
const PORT = 8080;
const PATH_PROJECT = join(__dirname, '..');
const PATH_SOURCE = join(PATH_PROJECT, 'src');
const PATH_BUILD = join(PATH_PROJECT, 'docs');
const PATH_ASSETS = 'assets';
const PATH_DATA = 'data';

const config = {
  entry: join(PATH_SOURCE, 'index'),
  output: {
    path: PATH_BUILD,
    filename: join(PATH_ASSETS, `[name]${NAME_SUFFIX}.js`)
  },
  resolve: {
    root: [PATH_SOURCE],
    extensions: ['', '.js', '.scss']
  },
  module: {
    loaders: [{
      /* javascript */
      test: /\.js$/,
      include: [PATH_SOURCE],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: [
          ['env', {
            loose: true
          }]
        ]
      }
    }, {
      /* styles */
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
    }, {
      /* root static assets. */
      test: /\.ico$/i,
      loader: 'file?name=[name].[ext]'
    }, {
      /* static assets */
      test: /\.woff$/i,
      loader: `file?name=${join(PATH_ASSETS, '[name].[ext]')}`
    }, {
      /* data, config, mocks */
      test: /\.json$/i,
      loader: `file?name=${join(PATH_DATA, '[name].[ext]')}`
    }]
  },
  plugins: [
    new ExtractTextPlugin(join(PATH_ASSETS, `[name]${NAME_SUFFIX}.css`), {}),
    new HtmlWebpackPlugin({
      template: join(PATH_SOURCE, 'index.html'),
      filename: 'index.html',
      allChunks: true
    }),
    new CleanWebpackPlugin([PATH_BUILD], {
      root: PATH_PROJECT,
      verbose: false,
      dry: false,
      exclude: ['data']
    })
  ],
  stats: {
    children: false,
    hash: false,
    version: false,
    colors: true
  },
  postcss: () => [autoprefixer],
  sassLoader: {
    includePaths: [PATH_SOURCE]
  }
};

if (process.argv.indexOf('--watch') > -1) {
  require('serve-local')(PATH_BUILD, PORT);
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true,
    ignore: /.(js|json|ico|woff)$/
  }));
}

if (IS_PRODUCTION) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  config.devtool = '#eval';
}

module.exports = config;
