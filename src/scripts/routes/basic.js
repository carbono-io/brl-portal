'use strict';

/**
 * Defines basic routes
 */

// external dependencies
var page = require('page');

/**
 * Export a function to define basic routes for router
 */
module.exports = function (carbo, config, services, components) {

    // home -> projects (redirect)
    page('/', '/iris');
    page('/iris', '/projects');

    page('/login', function () {
        carbo.set('route', 'login');
    });

    page('/register', function () {
        carbo.set('route', 'register');
        carbo.set('lastPath', '/register');
    });

    page('/error', function () {
        carbo.set('route', 'error');
        carbo.set('lastPath', '/error');
    });
};
