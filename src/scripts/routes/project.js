'use strict';

/**
 * Defines project routes
 */

// external dependencies
var page = require('page');

var REQUIRED_SERVICES = ['userService'];

/**
 * Export a function to define basic routes for router
 */
module.exports = function (carbo, config, services, components) {

    REQUIRED_SERVICES.forEach(function (serviceName) {
        if (!services[serviceName]) {
            throw new Error('No ' + serviceName + ' available for project routes initialization');
        }
    });

    var userService = services.userService;

    /**
     * Listing of projects owned by the user
     */
    page('/projects', function () {

        // check if user is logged
        userService.isLogged()
            .then(function (isLogged) {
                if (isLogged) {
                    carbo.set('route', 'projects');
                } else {
                    // redirect
                    page('/login');
                }
            });
    });
};
