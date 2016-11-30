'use strict';

module.exports = {
  devtool: 'inline-source-map',
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
};
