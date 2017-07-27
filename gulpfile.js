'use strict';
//global variable
var sources       = require('./package.json'),
    gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    header        = require('gulp-header'),
    sourcemaps    = require('gulp-sourcemaps'),
    banner        = [
                      '/**',
                      ' * <%= sources.name %> - <%= sources.description %>',
                      ' * @author <%= sources.author.name %>',
                      ' * @version v<%= sources.version %>',
                      ' * @link <%= sources.author.homepage %>',
                      ' * @license <%= sources.license %>',
                      ' */',
                      ''
                    ].join('\n');
var browser_support = [
                        'last 2 versions', 
                        '> 5%', 
                        'Firefox ESR',
                        "ie >= 10",
                        "ie_mob >= 10",
                        "ff >= 30",
                        "chrome >= 34",
                        "safari >= 7",
                        "opera >= 23",
                        "ios >= 7",
                        "android >= 4.4",
                        "bb >= 10"
                      ],
    date          = new Date().toISOString().slice(0,10);
//css-task variable
var sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    autoprefixer  = require('gulp-autoprefixer'),
//js-task variable
    concat        = require('gulp-concat'),
    jshint        = require('gulp-jshint'),
    uglify        = require('gulp-uglify'),
//image-task variable
//staging & delivery variable
    copy          = require('gulp-copy'),
    zip           = require('gulp-zip');
// css task 
gulp.task('sass', function() {
  return gulp.src("./src/sass/**/*.sass")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true}).on('error', sass.logError))
    .pipe(concat(sources.name + '.min.css'))
    .pipe(cssnano({autoprefixer: {browsers: browser_support, add: true} }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(header(banner, {sources : sources}))
    .pipe(gulp.dest("./src/css/"))
    .pipe(browserSync.stream())
});
// javascript task
gulp.task('javascript', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(sourcemaps.init())
    .pipe(concat(sources.name + '.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(header(banner, {sources : sources}))
    .pipe(gulp.dest('./src/app/'))
    .pipe(browserSync.stream())
});
// html task
gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./src'))
    .pipe(browserSync.stream())
});
// static server & task watch
gulp.task('default', function() {
  browserSync.init({
    server: "./src"
  });
  gulp.watch('src/sass/**/*.sass', function (event) {
    console.log(event);
    gulp.start('sass');
  });
  gulp.watch('src/js/**/*.js', function (event) {
    console.log(event);
    gulp.start('javascript');
  });
  gulp.watch('src/**/*.html', function (event) {
    console.log(event);
    gulp.start('html').on('change', browserSync.reload);
  });
});
// delivery & compress ( integrated with web & apps )
gulp.task('dist', function(){
  return gulp.src('./src/**/*')
    .pipe(zip( 'prod_'+ sources.name + '_' + date +'.zip'))
    .pipe(gulp.dest('./dist'))
});