var fs = require('fs');
var gutil = require('gulp-util');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

var jsRe = /.+\.js$/;
var htmlRe = /.+\.html$/;

exports.jsRe = jsRe;
exports.htmlRe = htmlRe;

exports.isJs = function (file) {
    return jsRe.test(file.path);
};

exports.isHtml = function (file) {
    return htmlRe.test(file.path);
};
