var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['test', 'lint'], function() {});

gulp.task('test', function() {
  return gulp.src('test/*test.js')
             .pipe(mocha());
          // .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function() {
  return gulp.src(['*.js', 'test/*.js', 'helpers/*.js'])
             .pipe(jshint('.jshintrc'))
             .pipe(jshint.reporter('jshint-stylish'));
});
