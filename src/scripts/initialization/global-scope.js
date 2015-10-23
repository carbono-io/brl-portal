'use strict';

var CONSTANTS = require('../constants');

/**
 * Defines variables that are made available through the global scope
 */
module.exports = function (carbo, config) {

    /**
     * Data about the current logged user
     */
    carbo.set('userData', {});

    /**
     * Array of projects of the user
     */
    carbo.set('userProjects', null);

    /**
     * Error
     */
    carbo.set('err', null);
};
