'use strict';

module.exports = function (payload) {
    var gulp = payload.gulpContainer.gulp;
    var minify = require('gulp-minify-html');
    var gulpif = require('gulp-if');
    var wrap = require('gulp-wrap');
    var watch = require('gulp-watch');
    var config = payload.settings.html;
    var isTemplatingRequired = function() {
        return (config.wrappingTemplate && config.wrappingTemplate !== '');
    };

    gulp.task('html:process', function () {
        gulp.src(config.src)
            .on('error', payload.errorHandler)
            .pipe(gulpif(isTemplatingRequired(), wrap({ src: config.wrappingTemplate || '' })))
            .pipe(minify(config))
            .pipe(gulp.dest(config.dest))
            .pipe(payload.livereload());
    });

    gulp.task('html:watch', ['html:process'], function () {
        watch(config.src, { ignoreInitial: false, verbose: true }, function() {
            gulp.start('html:process');
        });
    });

    gulp.task('html', ['html:watch']);

    payload.gulpContainer.getContainer('dev').addTask('html');
};
