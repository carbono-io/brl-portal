var q = require('q');

/**
 * Login
 * @return {Promise}
 */
exports.login = function () {

    var defer = q.defer();

    setTimeout(function () {
        defer.resolve();
    }, 2000);

    return defer.promise;
};
