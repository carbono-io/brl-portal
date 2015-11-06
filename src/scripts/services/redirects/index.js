'use strict';

/**
 * Operations regarding the backend related to project
 * management
 */

var page = require('page');
var CONSTANTS = require('../../constants');

/**
 * Class responsible for dealing with the projects service.
 */
function RedirectService() {
}

RedirectService.prototype.redirectProjects = function () {

    page('/brl');
};

RedirectService.prototype.redirectLogin = function () {
    page('/login');
};

RedirectService.prototype.redirectHome = function () {
    page('/');
};

RedirectService.prototype.redirectIde = function (code) {
    window.location = CONSTANTS.ide + code + '/';
};

RedirectService.prototype.redirectTo = function (path) {
    page(path);
};

// export the class
module.exports = RedirectService;
