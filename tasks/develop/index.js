// External
var runSequence = require('run-sequence');

var config = require('../config');
var aux = require('../auxiliary');

module.exports = function (gulp, $) {

    require('./serve')(gulp, $);
    require('./watch')(gulp, $);

    /**
     * Runs all tasks for development environment setup and go
     */
    gulp.task('develop', 'Set up development environment. If you are in doubt, try this one ;)', function (done) {
        // First compile less, run code-machine and watch
        // then serve.
        runSequence(['less', 'javascript'], 'serve:src', 'watch', done);
    });

};
