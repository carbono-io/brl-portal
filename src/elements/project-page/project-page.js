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
        ready: function () {
            var PROJECT_NAME_MAX_LENGTH = 60;
            var submitButton = this.$.createProjectButton;
            var projectNameInput = this.$.projectName;
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
                    projectNameInput.parentElement.className += " error";
                } else {
                    validName = true;
                    projectNameInput.parentElement.className = "input-container";
                }
                enableDisableSubmitButton();
            }
        },
        openCreatePopup: function() {
            // Init
            this.$.projectName.value = '';
            this.$.projectName.parentElement.className = "input-container";
            this.$.projectDescription.value = '';
            this.$.createProjectButton.disabled = true;
            // Open
            this.$.createPopup.open();
        },
        submitCreateProject: function (e) {
            var project = {
                name: this.newProjName,
                description: this.newProjDescription || "",
            };
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
                    alert('Sessão expirada, por favor, faça login novamente');
                    popup.close();
                    redirectService.redirectLogin();
                })
                .then(function (projectCreated) {
                    popup.toggleLoading(false);
                    alert('Projeto criado com sucesso!');
                    popup.close();
                    redirectService.redirectProjects();
                    // Message and page redirect
                }, function (err) {
                    popup.toggleLoading(false);
                    if (err.code === 403) {
                        alert('Sessão expirada, por favor, faça login novamente');
                        popup.close();
                        redirectService.redirectLogin();
                    } else {
                        alert('Erro ao criar projeto!');
                        popup.close();
                        redirectService.redirectProjects();
                    }
                }
            )
                .done();
        }
    });

})(window);
