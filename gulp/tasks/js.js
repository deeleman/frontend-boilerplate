'use strict';

module.exports = function (gulpContainer, settings, errorHandler) {
    var gulp = gulpContainer.gulp;
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var rename = require('gulp-rename');
    var livereload = require('gulp-livereload');
    var config = settings.js;

    gulp.task('js', function() {
        gulp.src(config.src)
            .on('error', errorHandler)
            .pipe(concat(config.dest.filename))
            .pipe(gulp.dest(config.dest.path))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dest.path))
            .pipe(livereload());
    });

    livereload.listen();

    gulpContainer.getContainer('dev').addTask('js');
};
