const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'vue-live-preview.min.js',
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
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};
