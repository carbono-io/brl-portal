(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-header',

        properties: {
            services: {
                type: Object
            }
        },

        toHomeScreen: function () {
            services.redirectService.redirectHome();
        }
    });
})();
