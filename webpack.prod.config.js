var config = require('./webpack.config.js');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.devtool = 'source-map';

config.output = {
  path: path.resolve('./build/'),
  // filename: '[name]-[hash].js',
  filename: '[name].js',
};

config.module.loaders = [
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
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

];

config.plugins = [
  new ExtractTextPlugin('[name].css')
];

module.exports = config;
