var path = require('path');

var polybuild   = require('polybuild');

var config  = require('../config');
var aux = require('../auxiliary');

module.exports = function (gulp, $) {

    gulp.task('build:stage', 'Bundles all assets into files ready for stage-deployment', ['less', 'javascript'], function () {

        return gulp.src(config.srcDir + '/index.html')
            // maximumCrush should uglify the js
            .pipe(polybuild({ maximumCrush: true }))
            .pipe($.size({
                title: 'build:stage',
                showFiles: true,
                gzip: true
            }))
            .pipe(gulp.dest(config.stageDir));

    });

    gulp.task('build', 'Prepare dist', ['build:stage'], function () {

        var stageFiles = [
            config.stageDir + '/index.build.html',
            config.stageDir + '/index.build.js',
        ];

        return gulp.src(stageFiles, { baseDir: config.stageDir })
            // remove debugging (debugger, console.*, alert)
            .pipe($.if(aux.isJs, $.stripDebug()))
            .pipe($.size({
                title: 'build',
                showFiles: true,
                gzip: true
            }))
            .pipe(gulp.dest(config.distDir));
    });
};
