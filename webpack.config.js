const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
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
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
      filename: 'vue-live-preview.min.js',
      libraryTarget: 'window',
      library: 'VueLivePreview',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/LivePreview.vue'),
    output: {
      filename: 'vue-live-preview.js',
      libraryTarget: 'umd',
      library: 'vue-live-preview',
      umdNamedDefine: true
    }
  })
];
