'use strict';

// Scripts dependend upon
require('./bower_components/webcomponentsjs/webcomponents-lite.js');

// load initialization scripts
var initServices    = require('./scripts/initialization/services');
var initComponents  = require('./scripts/initialization/components');
var initRouter      = require('./scripts/initialization/router');
var initGlobalScope = require('./scripts/initialization/global-scope');

var carbo = document.getElementById('carbo');

// Only start setting up thing when WebComponentsReady event is fired
window.addEventListener('WebComponentsReady', function () {

    var config = {
        env: 'development'
    };

    // Services
    var services   = initServices(carbo, config);        
    // Components
    var components = initComponents(carbo, config);
    // Router
    var router     = initRouter(carbo, config, services, components);
    // Set up global scope
    initGlobalScope(carbo, config, services, components);

    // if configuration for env is 'development',
    // initialize developer tools
    if (config.env === 'development') {
        require('./scripts/development')(carbo, config, services, components);
    }
});

// Export the component scope
module.exports = carbo;
