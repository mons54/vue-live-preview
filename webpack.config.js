const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

module.exports = {
  entry: {
    'live-preview': './src/index.js',
    'live-preview.min': './src/index.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'window',
    library: 'VueLivePreview',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};
