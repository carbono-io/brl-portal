'use strict';

/**
 * window.localStorage wrapper
 */

var _ = require('lodash');

var fakeData = {
    userToken: '10293inkj1y37812y12301i2jeio123'
};

_.each(fakeData, function (value, key) {
    window.localStorage.setItem(key, value);
});



var STORAGE = window.localStorage;

function LocalStorageAPI(config) {
    this.config = config;

    if (!localStorage) {
        throw new Error('localStorage not supported by current browser');
    }
}

LocalStorageAPI.prototype.getItem = function (keyName) {
    return STORAGE.getItem(keyName);
};

LocalStorageAPI.prototype.setItem = function (keyName, value) {

    // convert value to string, if it is not
    value = (typeof value === 'object') ? JSON.stringify(value) : value;

    return STORAGE.setItem(keyName, value);
};

LocalStorageAPI.prototype.clear = function () {
    return STORAGE.clear();
};

// export the class
module.exports = LocalStorageAPI;
