'use strict';

module.exports = function() {
    var gulp = require('gulp');
    var containerWrapper = {};

    var container = function(container) {
        if (!containerWrapper[container] || Object.prototype.toString.call(containerWrapper[container]) !== '[object Array]') {
            containerWrapper[container] = [];
        }
        return {
            addTask: function(task) {
                containerWrapper[container].push(task);
            }
        };
    };

    var bootstrap = function() {
        for (var container in containerWrapper) {
            if (containerWrapper.hasOwnProperty(container)) {
                gulp.task(container, containerWrapper[container]);
            }
        }
    };

    return {
        gulp : gulp,
        getContainer: container,
        bootstrap: bootstrap
    };
};
