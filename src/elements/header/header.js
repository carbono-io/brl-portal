(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-header',

        properties: {
            userData: {
                type: Object,
                notify: true
            }
        }
    });
})();