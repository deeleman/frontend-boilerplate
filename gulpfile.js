'use strict';

var fs = require('fs');
var errorHandler = require('./gulp/utils/errorHandler');
var gulpContainer = require('./gulp/utils/gulp-ioc')();
var settings = require('./gulp/gulp.settings.json');

fs.readdirSync(__dirname + '/gulp/tasks').forEach(function(task) {
    require('./gulp/tasks/' + task)(gulpContainer, settings, errorHandler);
});

gulpContainer.bootstrap();
