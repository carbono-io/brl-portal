'use strict';

/**
 * Operations regarding the backend related to project
 * management
 */

var Q = require('q');
var _ = require('lodash');
var request = require('superagent');

/**
 * Class responsible for dealing with the projects service.
 */
function ProjectsServiceClient(config) {
    this.config = config;
}

ProjectsServiceClient.prototype.read = function (data) {
    var defer = Q.defer();
    var getProjectsUrl = 'http://localhost:7888/account-manager/projects';
    var defaultImage = '../../../img/placeholder-project-img.png';
    request
        .get(getProjectsUrl)
        .set('Content-Type', 'application/json')
        .set('crbemail', data.email)
        .set('Accept', 'application/json')
        .end(function (err, res) {

            setTimeout(function () {
                if (res.body.data) {
                    var projects = [];
                    for (var i in res.body.data.items) {
                        try {
                            var dateAux = new Date(res.body.data.items[i].project.modifiedAt);
                            res.body.data.items[i].project.modifiedAt = formatBrDate(dateAux);
                            dateAux = new Date(res.body.data.items[i].project.createdAt);
                            res.body.data.items[i].project.createdAt = formatBrDate(dateAux);
                            res.body.data.items[i].project.img = defaultImage;
                            projects.push(res.body.data.items[i].project);
                        } catch (e) {
                            // Log
                            res.body.data.items[i].project.modifiedAt = formatBrDate(new Date());
                            res.body.data.items[i].project.createdAt = formatBrDate(new Date());
                            res.body.data.items[i].project.img = defaultImage;
                            projects.push(res.body.data.items[i].project);
                        }
                        
                    }
                    defer.resolve(projects);
                } else {
                    defer.reject(res.body.error);
                }
            }, 500);
        });

    return defer.promise;
};

ProjectsServiceClient.prototype.create = function (data) {

    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve({
            id: _.uniqueId('project_')
        });

    }, 1000);

    return defer.promise;
};

var formatBrDate = function(paramDate) {
    var options = {year: 'numeric', month: 'short', day: 'numeric' };
    return paramDate.toLocaleDateString('pt-BR', options);
};

var formatUsDate = function(paramDate) {
    var options = {year: 'numeric', month: 'short', day: 'numeric' };
    return paramDate.toLocaleDateString('en-US', options);
};

// export the class
module.exports = ProjectsServiceClient;
