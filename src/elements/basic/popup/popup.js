(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-popup',

        properties: {
            closable: {
                type: Boolean,
                notify: true,
                value: false
            }
        },

        open: function () {
            this.toggleClass("active", true, this.$.popupWrapper);
        },

        close: function () {
            this.toggleClass("active", false, this.$.popupWrapper);
        },

        toggleLoading: function (toggle) {
            this.toggleClass("active", toggle, this.$.loadingState);
        }
    });
})();
