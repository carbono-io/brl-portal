(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-popup',

        open: function () {
            this.$.popupWrapper.setAttribute("class", "active");
        },

        close: function () {
            this.$.popupWrapper.removeAttribute("class");
        }
    });
})();
