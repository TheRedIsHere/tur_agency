var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass 		= require('gulp-sass');
var jade        = require('gulp-jade');
var sourcemaps  = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');


var directory = "./dev/";

var path = {
    scss : directory + 'scss/**/**/*.scss',
    jade : directory + "jade/*.jade",
    css  : directory + "css",
};

gulp.task('serve',['sass', 'jade'], function() {
    browserSync.init({
        server: directory
    });
    gulp.watch(path.scss, ['sass']);
    gulp.watch(path.jade, ['jade']);
    gulp.watch(directory + "*.html").on('change', browserSync.reload);
});

gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    return gulp.src(path.jade)
        .pipe(jade({
			pretty : '\t',
        }))
        .pipe(gulp.dest(directory))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(path.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);