/**
 * i18n service
 */

// native dependencies
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// external dependencies
var Q = require('q');

/**
 * I18N Service class
 */
function I18NService() {
    var i18nextOptions = {
        fallbackLng: 'en',
        // Locales that are loadable
        lngWhitelist: ['pt', 'en']
    };

    this._i18n = window.i18n;

    i18n.init(i18nextOptions, this._handleI18NextInitializeReady.bind(this));

    // handle language change events
    this.on('language-changed', _handleLanguageChange.bind(this));
}

// Let I18NService inherit from event emitter
util.inherits(I18NService, EventEmitter);

/**
 * The callback called immediately after the i18n init is done
 */
I18NService.prototype._handleI18NextInitializeReady = function (err, t) {


    // set methods
    this.translateObject = this._i18n.translateObject;
    this.t = t;

    // handle language changing
    _handleLanguageChange.call(this);
    
    this.emit('i18n-initialized', this);
};

/**
 * Changes the language
 */
I18NService.prototype.setLng = function (lng) {
    var defer = Q.defer();

    this._i18n.setLng(lng, function () {

        this.emit('language-changed', this);

    }.bind(this));

    return defer.promise;
};

/**
 * Retrieves the current language
 */
I18NService.prototype.getLng = function () {

    return this._i18n.lng();
};

// Define some dinamic properties
Object.defineProperty(I18NService.prototype, 'language', {
    get: function () {
        return this.getLng();
    },
    set: function () {
        throw new Error('not possible to set I18NService language property');
    }
});

/**
 * Auxiliary functions
 */
function _handleLanguageChange() {
    this.translateObject(document);
}

module.exports = I18NService;
