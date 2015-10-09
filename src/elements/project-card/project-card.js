(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-project-card',

        properties: {
            /**
             * The project represented by the project-card
             * @type {Object}
             */
            project: {
                type: Object,
                notify: true,
            }
        },
        
    });
})();