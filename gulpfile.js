var gulp = require('gulp');
var watch = require('gulp-watch');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var dirs2json = require('./scripts/dirs2json');

var BUILD_DIR = './build/';
var ROOT_DIR = './src/root';

gulp.task('default', function() {
   build();
   runserver();
});

gulp.task('build', function() {
   build();
});

gulp.task('sass', function() {
   css();
});

gulp.task('lint', function() {
   //lint
});

gulp.task('test', function() {
   //test
});

gulp.task('watch', function() {
  build();
  runserver();
  return watch('./src/**', function(){
      build();
  });
});

function build(){
    console.log('build image...');  
    dirs2json(ROOT_DIR, BUILD_DIR);
    css();
}

function css(){
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
}

function runserver(){
  console.log('starting local server on port 8080...');
  exec('node node_modules/http-server/bin/http-server', function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
}