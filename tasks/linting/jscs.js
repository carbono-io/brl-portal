var path = require('path');

var config = require('../config');

var jscsConfig = {
    configPath: '.jscsrc',
};

var notifyErrorOptions = {
    title: 'JSCS style check error',
    message: '<%= error.message %>',
    open: 'file:///<%= error.filename %>',
    sound: false,
    // Basso, Blow, Bottle, Frog, Funk, Glass, Hero,
    // Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
    icon: path.join(__dirname, 'logo.png'),
};

module.exports = function (gulp, $) {

    gulp.task('jscs:elements', function () {

        return gulp.src([
                config.srcDir + '/elements/**/*.js',
                '!' + config.srcDir + '/elements/**/*.bundle.js',
            ])
            .pipe($.jscs())
            .on('error', $.notify.onError(notifyErrorOptions));
    });

    gulp.task('jscs:application', function () {

        return gulp.src([
                config.srcDir + '/index.js',
                '!' + config.srcDir + '/**/*.bundle.js',
                config.srcDir + '/scripts/**/*.js',
            ])
            .pipe($.jscs())
            .on('error', $.notify.onError(notifyErrorOptions));
    });

    gulp.task('jscs:tasks', function () {

        return gulp.src([
                'gulpfile.js',
                'tasks/**/*.js'
            ], { base: '.' })
            .pipe($.jscs({
                configPath: '.jscsrc',
                fix: true,
            }))
            .pipe(gulp.dest('.'))
            .on('error', $.notify.onError(notifyErrorOptions));
    });

    /**
     * Runs jscs against scripts. Todo: extract js from web componetns as well.
     */
    gulp.task(
        'jscs',
        'Checks your javascript code for style errors',
        ['jscs:elements', 'jscs:application', 'jscs:tasks']
    );
};
