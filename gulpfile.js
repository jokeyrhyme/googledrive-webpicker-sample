'use strict';

// foreign modules

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

// this module

// modify some webpack config options
var devCompiler;
var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;

// create a single instance of the compiler to allow caching
devCompiler = webpack(devConfig);

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build-dev', ['webpack:build-dev'], function () {
  gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) { throw new gutil.PluginError('webpack:build', err); }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack:build-dev', function (callback) {
// run webpack
  devCompiler.run(function (err, stats) {
    if (err) { throw new gutil.PluginError('webpack:build-dev', err); }
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function (callback) {
// modify some webpack config options
  var devServerConfig = Object.create(devConfig);
  devServerConfig.devtool = 'eval';

// Start a webpack-dev-server
  new WebpackDevServer(webpack(devServerConfig), {
    publicPath: '/' + devServerConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function (err) {
    if (err) { throw new gutil.PluginError('webpack-dev-server', err); }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
  });
});
