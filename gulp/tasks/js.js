'use strict';

module.exports = function (payload) {
    var gulp = payload.gulpContainer.gulp;
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var rename = require('gulp-rename');
    var config = payload.settings.js;

    gulp.task('js', function() {
        gulp.src(config.src)
            .on('error', payload.errorHandler)
            .pipe(concat(config.dest.filename))
            .pipe(gulp.dest(config.dest.path))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dest.path))
            .pipe(payload.livereload());
    });

    payload.gulpContainer.getContainer('dev').addTask('js');
};
