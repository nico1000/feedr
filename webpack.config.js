'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  entry: "./js/main.js",
  output: {
    path: path.resolve('.'),
    // filename: '[name]-[hash].js',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass", "postcss"]
      },
      {
        test: /\.json$/,
        loaders: ["json"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]

};
