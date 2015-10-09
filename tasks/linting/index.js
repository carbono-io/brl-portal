module.exports = function (gulp, $) {
    require('./jscs')(gulp, $);
    require('./jshint')(gulp, $);
};
