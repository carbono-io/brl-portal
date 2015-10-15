'use strict';

/**
 * Operations regarding the backend related to project
 * management
 */

var page = require('page');

/**
 * Class responsible for dealing with the projects service.
 */
function RedirectService() {
}

RedirectService.prototype.redirectProjects = function () {
    
    page('/');
};

RedirectService.prototype.redirectLogin = function () {
    page('/login');
};

// export the class
module.exports = RedirectService;
