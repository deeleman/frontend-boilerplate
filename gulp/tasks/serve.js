'use strict';

module.exports = function (gulpContainer, settings) {
    var gulp = gulpContainer.gulp;
    var serve = require('gulp-serve');
    var config = settings.server;

    gulp.task('serve', serve({
        root: config.wwwroot,
        port: config.port
    }));

    gulpContainer.getContainer('dev').addTask('serve');
};
