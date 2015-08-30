'use strict';

module.exports = function (payload) {
    var gulp = payload.gulpContainer.gulp;
    var serve = require('gulp-serve');
    var config = payload.settings.server;

    gulp.task('serve', serve({
        root: config.wwwroot,
        port: config.port
    }));

    payload.gulpContainer.getContainer('dev').addTask('serve');
};
