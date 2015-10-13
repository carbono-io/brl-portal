'use strict';

/**
 * Behavior for internationalization
 * Used in carbo-components that are aware of the main application scope
 *
 * DO NOT CHANGE THIS FILE WITHOUT CHANGING IT AT THE OTHER PROJECT (brl-portal) AS WELL
 * This will be moved into a separate repo
 */

/**
 * Properties that are required
 * @type {Object}
 */
exports.properties = {
    i18nService: {
        type: Object,
        notify: true,
        observer: 'handleI18nServiceChange',
    }
};

/**
 * Callback to be executed whenever the component is ready
 * @return {[type]} [description]
 */
exports.ready = function () {
    if (this.i18nService) {
        this.handleLanguageChange(this.i18nService);
    }
}

/**
 * Set event listeners onto the i18nService
 */
exports.handleI18nServiceChange = function (i18nService, old) {
    i18nService.on('i18n-initialized', this.handleLanguageChange.bind(this));

    i18nService.on('language-changed', this.handleLanguageChange.bind(this));
};

/**
 * Handles language changes
 */
exports.handleLanguageChange = function () {
    this.i18nService.translateObject(this.root);

    // notify the component about language changes
    this.notifyPath('i18nService.language', this.i18nService.language);
};

/**
 * Translates a key
 * @param  {String} key
 * @return {String}     The translated value
 */
exports.i18nTranslate = function (key) {
    return this.i18nService.t(key);
};

exports.i18nGetLng = function () {
    return this.i18nService.getLng();
};
