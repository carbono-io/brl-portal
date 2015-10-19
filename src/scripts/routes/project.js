'use strict';

/**
 * Defines project routes
 */

// external dependencies
var page = require('page');

/**
 * List of services required for initializing project related routes
 * @type {Array}
 */
var REQUIRED_SERVICES = [
    'userService',
    'projectsService',
    'redirectService'
];

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
    var projectsService = services.projectsService;

    /**
     * Listing of projects owned by the user
     */
    page('/projects', function () {

        // check if user is logged
        userService.getLoggedUserData()
            .then(function (userData) {
                carbo.set('route', 'projects');
                carbo.set('userData', userData);

                console.log(userData);

                // retrieve projects
                return projectsService.read({
                    owner: userData.id,
                    email: userData.email,
                });

            }, function (err) {
                // user not logged
                // redirect
                page('/login');
            })
            .then(function (userProjects) {

                console.log(userProjects);

                carbo.set('userProjects', userProjects);
            },
            function (err) {
                console.log(err);
                carbo.set('err', err);
                page('/error');
            }
        )
            .done();
    });

    page('/createProject', function () {

        // check if user is logged
        userService.getLoggedUserData()
            .then(function (userData) {
                carbo.set('route', 'projects');
                carbo.set('userData', userData);

                // create Project
                return projectsService.create({
                    owner: userData.id,
                    email: userData.email,
                    name: 'Project created with BRL',
                    description: 'Description of the project',
                });

            }, function (err) {
                // user not logged
                // redirect
                page('/login');
            })
            .then(function (projectCreated) {

                console.log(projectCreated);

                carbo.set('projectCreated', projectCreated);
            }, function (err) {
                console.log(err);
                carbo.set('error', err);
                page('/error');
            }
        )
            .done();
    });
};
