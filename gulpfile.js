'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test-server', function() {
  gulp
    .src(['./src/server/**/*.test.js'])
    .pipe(mocha());
});

gulp.task('watch', ['test-server'], function() {
  gulp.watch(['./src/server/**/*.js'], ['test-server']);
  console.log(`Watching on PID ${process.pid}`);
});
