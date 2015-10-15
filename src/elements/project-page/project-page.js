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

            var validateProjectName =  function (projName) {
                var error = [];
                if (projName === undefined || projName === null) {
                    error.push({
                        field: 'name',
                        error: 'name is required',
                    });
                } else {
                    if (projName.length > 60) {
                        error.push({
                            field: 'name',
                            error: 'name must not have more than 60 chars',
                        });
                    }
                }

                return error;
            };
            var error = null;
            error = validateProjectName(this.newProjName);
            if (error !== null && error.length === 0) {
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
                        alert('Sessão expirada, por favor, faça login novamente');
                        popup.close();
                        redirectService.redirectLogin();
                    })
                    .then(function (projectCreated) {
                        alert('Projeto criado com sucesso!');
                        popup.close();
                        redirectService.redirectProjects();
                        // Message and page redirect
                    }, function (err) {
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
            } else {
                alert(error);
            }
        }
    });

})(window);
