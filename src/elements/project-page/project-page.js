(function (window) {
    'use strict';
    // Register the element with Polymer
    Polymer({
        is: 'carbo-project-page',

        properties: {
            projects: {
                type: Array,
                observer: '_showProjects',
                notify: true
            }
        },
        ready: function () {
            var PROJECT_NAME_MAX_LENGTH = 60;
            var submitButton = this.$.createProjectButton;
            var projectNameInput = this.$.projectName;
            var thisElement = this;
            projectNameInput.addEventListener("keyup", validateProjectName);
            projectNameInput.addEventListener("focusout", validateProjectName);
            submitButton.disabled = true;
            // project name beggins invalid
            var validName = false;

            // function to enable/disable submit-button
            function enableDisableSubmitButton() {
                // check if input validations are true
                if (validName) {
                    submitButton.disabled = false;
                } else {
                    submitButton.disabled = true;
                }
            }

            // validates Project Name
            function validateProjectName() {
                var value = projectNameInput.value;
                if (value === "" || value.length > PROJECT_NAME_MAX_LENGTH) {
                    validName = false;
                    submitButton.disabled = true;
                    thisElement.toggleClass('error', true, projectNameInput.parentElement);
                } else {
                    validName = true;
                    thisElement.toggleClass('error', false, projectNameInput.parentElement);
                }
                enableDisableSubmitButton();
            }
        },
        openCreatePopup: function() {
            // Init
            this.$.projectName.value = '';
            this.$.projectDescription.value = '';
            this.$.createProjectButton.disabled = true;
            this.buttonContent = "Criar projeto";
            this.toggleClass('general-error', false, this.$.createForm);
            // Open
            this.$.createPopup.open();
        },
        submitCreateProject: function (e) {
            var project = {
                name: this.newProjName,
                description: this.newProjDescription || "",
            };
            var thisElement = this;
            var popup = this.$.createPopup;
            var userService = window.services.userService;
            var projectsService = window.services.projectsService;
            var redirectService = window.services.redirectService;
            var carbo = window.carbo;
            // check if user is logged
            popup.toggleLoading(true);
            userService.getLoggedUserData()
                .then(function (userData) {
                    carbo.set('userData', userData);

                    // create Project
                    return projectsService.create({
                        email: userData.email,
                        name: project.name,
                        description: project.description,
                    });

                }, function (err) {
                    // user not logged
                    popup.toggleLoading(false);
                    popup.close();
                    redirectService.redirectLogin();
                })
                .then(function (projectCreated) {
                    popup.toggleLoading(false);
                    popup.close();
                    redirectService.redirectIde(projectCreated.code);
                }, function (err) {
                    popup.toggleLoading(false);
                    if (err.code === 403) {
                        popup.close();
                        redirectService.redirectLogin();
                    } else {
                        popup.close();
                        redirectService.redirectProjects();
                    }
                }
            )
            .catch(function (err) {
                popup.toggleLoading(false);
                thisElement.toggleClass('general-error', true, thisElement.$.createForm);
                thisElement.buttonContent = 'Tentar novamente';
            })
            .done();
        },

        _showProjects: function(newValue, oldValue) {
            var loading = this.projects === null;
            var hasProjects = !loading && this.projects && this.projects.length > 0;

            if (!loading && !hasProjects) {
                this.openCreatePopup();
            }
        }

    });

})(window);
