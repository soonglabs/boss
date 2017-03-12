var gulp = require('gulp');
var Server = require('karma').Server;
var connect = require('gulp-connect');
var cors = require('cors');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var dirs2json = require('./scripts/dirs2json');

var BUILD_DIR = './build/';
var EXAMPLE_DIR = './example/';
var DIST_DIR = './dist/';
var ROOT_DIR = './src/root';

gulp.task('build', function() { 
     dirs2json(ROOT_DIR, BUILD_DIR);

     gulp.src('./src/js/**')
    .pipe(gulp.dest(BUILD_DIR + 'js'));

    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR + 'css'));
});

gulp.task('release', function() { 
     dirs2json(ROOT_DIR, DIST_DIR);

     gulp.src('./src/js/**')
    .pipe(gulp.dest(DIST_DIR + 'js'));

    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(DIST_DIR + 'css'));
});

gulp.task('test', ['build'], function(done) {
   new Server({
     configFile: __dirname + '/karma.conf.js',
     singleRun: true
   }, function() {
        done();
    }).start();
});

gulp.task('run', ['test'], function() {
  connect.server({
     middleware: function() {
        return [cors()];
    }
  });
});
