(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-project-page',

        properties: {
            projects: {
                type: Array,
                notify: true
            }
        },

        openCreatePopup: function() {
            this.$.createPopup.open();
        }
    });

})();
