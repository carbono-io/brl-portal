'use strict';

// external dependencies
var page = require('page');

/**
 * Variable to store data on whether the router has already been initialized.
 */
var ROUTER_INITIALIZED = false;

/**
 * Function to be executed only when webcomponents are ready.
 * Bear in mind that this event requires webcomponents-lite.js
 * to have been imported into the application.
 *
 * Receives a reference to the main scope of the application.
 *
 * Router is the last thing to be initialized in the application,
 * thus it receives so many objects, as they are all already available.
 *
 * And as it is not an html component, only a logical one,
 * it should not further read stuff from carbo binding scope.
 */
function initializeRouter(carbo, config, services, components) {

    if (!ROUTER_INITIALIZED) {
        // We use Page.js for routing. This is a Micro
        // client-side router inspired by the Express router
        // More info: https://visionmedia.github.io/page.js/

        // basic routes
        require('../routes/basic')(carbo, config, services, components);

        // project routes
        // must pass on all other parameters
        require('../routes/project')(carbo, config, services, components);

        // add #! before urls
        page({
            hashbang: true
        });

        // set router onto carbo
        carbo.set('router', page);

        // set router initialization to true
        ROUTER_INITIALIZED = true;
        
    } else {
        console.warn('Router has already been initialized.');
    }

    // Return page, so that it may be used for navigation
    return page;
}

// export function
module.exports = initializeRouter;
