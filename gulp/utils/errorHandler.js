'use strict';

module.exports = function () {
    var notify = require('gulp-notify');
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error %>'
    }).apply(this, args);

    this.emit('end'); // Keep gulp from hanging on this task
};
