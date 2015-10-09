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
    page('/', '/projects');

    page('/login', function () {
        carbo.set('route', 'login');
    });

    page('/register', function () {
        carbo.set('route', 'register');
    });
};
