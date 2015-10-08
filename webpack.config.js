'use strict';

// Node.js built-ins

var path = require('path');

// this module

module.exports = {
  context: __dirname,
  entry: { index: ['./src/index.js'] },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: []
};
