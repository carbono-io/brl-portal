'use strict';

/**
 * Define constants throughout the application here
 */
var constants = {
    api: {
        auth: {
            url: "http://hom.api.carbono.io/auth/oauth2/token/",
            clientId: "666",
            clientSecret: "k95j05083h08h",
        },
        getProjects: "http://hom.api.carbono.io/imp/projects/",
        createProject: "http://hom.api.carbono.io/mc/projects/"
    },
    ide: "http://hom.carbono.io/ide/#!/projects/"
};

module.exports = constants;
