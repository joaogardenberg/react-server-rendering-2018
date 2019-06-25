const path                 = require('path');
const merge                = require('webpack-merge');
const baseConfig           = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for NodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './src/server.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Don't bundle any libraries into our output
  // bundle if they are from node_modules
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);