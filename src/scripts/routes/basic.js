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

    // home
    page('/', function () {
        carbo.set('route', 'home');
    });
};
