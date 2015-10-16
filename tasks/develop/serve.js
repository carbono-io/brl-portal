var path = require('path');
var exec = require('child_process').exec;
var _    = require('lodash');

// External
var browserSync = require('browser-sync');

var config = require('../config');
var aux = require('../auxiliary');

module.exports = function (gulp, $) {

    /**
     * Serves the application client
     */
    gulp.task('serve:src', 'Serve the source code (for development)', function () {

        var bs = browserSync({
            ghostMode: false,
            port: 4000,
            server: {
                baseDir: 'src',
                routes: {
                    '/brl': './src',
                },
            },
            open: true,
            // tunnel: true
        });

        function notifyIsSrcServer() {
            bs.notify('<b>/src</b>', 3000);
        }

        // bs.emitter.on('client:connected', notifyIsSrcServer);
    });

};
