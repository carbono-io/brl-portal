'use strict';

/**
 * Script used for development purposes
 *
 * (let's break stuff here :)
 */
module.exports = function (carbo, config, services, components) {
    window.carbo = carbo;
    window.config = config;
    window.services = services;
    window.components = components;
};
