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
            },

            services: {
                type: Object
            }
        },

        editProject: function () {
            this.$.loadingProject.open();
            this.$.loadingProject.toggleLoading(true);
            services.redirectService.redirectIde(this.project.code);
        }
    });
})();
