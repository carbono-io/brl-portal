'use strict';

var CONSTANTS = require('../constants');

/**
 * Defines variables that are made available through the global scope
 */
module.exports = function (carbo, config) {
    
    /**
     * Array of projects of the user
     */
    carbo.set('userProjects', []);
};
