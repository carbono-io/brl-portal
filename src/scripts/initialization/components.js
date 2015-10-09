'use strict';

var CONSTANTS = require('../constants');

/**
 * Components are already instantiated through the html
 * Thus, all we do in this initialization function is to 
 * get a reference to them and set them onto the main application scope.
 */
module.exports = function (carbo, config) {

    carbo.set('components', {});

    return carbo.get('components');
};
