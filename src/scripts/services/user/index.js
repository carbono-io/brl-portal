'use strict';

var Q = require('q');

var REQUIRED_CONFIGURATIONS = [
    'localStorage'
];

/**
 * Defines the client side of the user service
 */
function UserServiceClient(config) {

    REQUIRED_CONFIGURATIONS.forEach(function (cf) {
        if (!config[cf]) {
            throw new Error('No ' + cf + ' for UserServiceClient instantiation');
        }
    });

    this.config = config;

    this.localStorage = config.localStorage;
}

/**
 * Verifies if the user is logged
 * @return {Promise -> Boolean} 
 */
UserServiceClient.prototype.isLogged = function () {
    
    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve(true);
    }, 1000);

    return defer.promise;
};

UserServiceClient.prototype.getLoggedUserData = function () {
    var defer = Q.defer();

    setTimeout(function () {
        defer.resolve({
            id: '123',
            name: 'Maria'
        });
    }, 1000);

    return defer.promise;
}

// export the class
module.exports = UserServiceClient;
