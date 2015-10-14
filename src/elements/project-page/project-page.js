(function (window) {
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
        },

        submitCreateProject: function (e) {
            var project = {
                name: this.newProjName,
                description: this.newProjDescription
            };

            console.log(window.services);
        }
    });

})(window);
