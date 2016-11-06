var gulp = require('gulp');
var mocha = require('gulp-mocha');
var connect = require('gulp-connect');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var dirs2json = require('./scripts/dirs2json');

var BUILD_DIR = './build/';
var ROOT_DIR = './src/root';

gulp.task('build', function() { 
   dirs2json(ROOT_DIR, BUILD_DIR);

     gulp.src('./src/js/**')
    .pipe(gulp.dest(BUILD_DIR + 'js'));

    gulp.src('./src/html/**')
    .pipe(gulp.dest(BUILD_DIR + 'html'));

     gulp.src('./assets/**')
    .pipe(gulp.dest(BUILD_DIR + 'assets'));

    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR + 'css'));
});

gulp.task('test', ['build'], function() {
  return gulp.src('test/test.js', {read: false})
      .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('run', ['test'], function() {
  connect.server();
});

// gulp.task('watch', ['run'], function() {
//   gulp.watch('src/**', ['run']);
// });