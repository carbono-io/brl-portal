'use strict';

var Q = require('q');
var _ = require('lodash');
var request = require('superagent');
var CJM = require('carbono-json-messages');
var pjson = require('../../../../package.json');
var uuid = require('node-uuid');
var CONSTANTS = require('../../constants');

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

UserServiceClient.prototype.login = function (data) {
    var defer = Q.defer();

    var authConfig = CONSTANTS.api.auth;

    request
        .post(authConfig.url)
        .set('Authorization', 'Basic ' + window.btoa(authConfig.clientId + ':' + authConfig.clientSecret))
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .send({
            grant_type: "password",
            username: data.email,
            password: data.password,
            scope: ""
        })
        .end(function (err, res) {

            setTimeout(function () {
                if (err) {
                    defer.reject(err);
                } else {
                    if (res.body && res.body.access_token && res.body.access_token.value) {
                        defer.resolve(res.body.access_token.value);
                    } else {
                        defer.reject();
                    }
                }
            }, 500);
        });

    // defer.resolve('aJE5uR6gKY4QiP8Kkg1rTGOUp3Zep72NxS41vbpW1RHX8jO10gvL0m3tInsOf8NFTsDRf96f4Tw5OvaI5fXWL68520gSNqr7cLyEoTlrSXFdv4sGf4kIFRTxiXetLe9nYLLsVa85TADkXxTulzcGJMwasit6Fc9mGC9oZCSQ0UeqwtXGBAEGwGPVIzg6fQDDpBahkXP737ZJuUOtq6apyNpfybbsG4kJVYv2zYrNjQFX8T2jkkA9q095tIJD98p7');

    return defer.promise;
};

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
            name: 'Maria',
            email: 'casadei@email.com',
        });
    }, 1000);

    return defer.promise;
};

// export the class
module.exports = UserServiceClient;
