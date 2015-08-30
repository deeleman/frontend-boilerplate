'use strict';

var fs = require('fs');
var errorHandler = require('./gulp/utils/errorHandler');
var gulpContainer = require('./gulp/utils/gulp-ioc')();
var settings = require('./gulp/gulp.settings.json');
var livereload = require('gulp-livereload');

var payload = {
    gulpContainer: gulpContainer,
    settings: settings,
    errorHandler: errorHandler,
    livereload: livereload
};

livereload.listen();

fs.readdirSync(__dirname + '/gulp/tasks').forEach(function(task) {
    require('./gulp/tasks/' + task)(payload);
});

gulpContainer.bootstrap();
