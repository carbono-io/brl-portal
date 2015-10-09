'use strict';

var Q = require('q');

/**
 * Defines the client side of the user service
 */
function UserServiceClient(config) {

    this.config = config;
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

// export the class
module.exports = UserServiceClient;
