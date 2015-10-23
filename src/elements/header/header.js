(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-header',

        toHomeScreen: function () {
            services.redirectService.redirectHome();
        }
    });
})();
