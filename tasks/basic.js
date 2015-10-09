var path = require('path');
var fs   = require('fs');

var mkdirp = require('mkdirp');
var del = require('del');

var config = require('./config');
var aux = require('./auxiliary');

module.exports = function (gulp, $, emitter) {

    /**
     * Creates tmp dir if it does not exist yet
     */
    gulp.task('tmp:create', function () {

        var tmpPath = path.join(config.root, config.tmpDir);

        mkdirp(tmpPath);
        mkdirp(path.join(tmpPath, 'cache'));
    });

    /**
     * Cleans the config.tmpDir
     */
    gulp.task('tmp:clean', function () {
        del.sync(path.join(config.root, config.tmpDir));
    });

    /**
     * Cleans whole cache
     */
    gulp.task('cache:clean', function () {
        del.sync(path.join(config.tmpPath, 'cache'));
    });

};
