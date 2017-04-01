var gulp = require('gulp');
var Server = require('karma').Server;
var connect = require('gulp-connect');
var cors = require('cors');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var debug = require("gulp-debug");
var dirs2json = require('./scripts/dirs2json');

var BUILD_DIR = './build/';
var WWW_DIR = './boss.computer/';
var DIST_DIR = './dist/';
var ROOT_DIR = './src/root';

var cssfiles = [
  'build/css/boss.css',
  'node_modules/jquery.terminal/css/jquery.terminal.css',
  'node_modules/spectre.css/dist/spectre.min.css',
  'node_modules/golden-layout/src/css/goldenlayout-base.css',
  'node_modules/golden-layout/src/css/goldenlayout-dark-theme.css'
];

var jsfiles = [
  'build/js/boss.js',
  'build/image.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery.terminal/js/jquery.terminal.js',
  'node_modules/jquery.terminal/js/jquery.mousewheel-min.js',
  'node_modules/vue/dist/vue.js',
  'node_modules/golden-layout/dist/goldenlayout.min.js',
  'node_modules/ace-builds/src-min/ace.js'
];

gulp.task('build', function() { 
     //create image
     dirs2json(ROOT_DIR, BUILD_DIR);
     //move js
     gulp.src('./src/js/**')
    .pipe(gulp.dest(BUILD_DIR + 'js'));
    //process sass and move css files
    gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR + 'css'));
    
    //move depedencies for demo app
     gulp.src(jsfiles)
    .pipe(gulp.dest(WWW_DIR + 'boss/js'));

     return gulp.src(cssfiles)
    .pipe(gulp.dest(WWW_DIR + 'boss/css'));
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
