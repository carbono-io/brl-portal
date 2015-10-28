'use strict';

/**
 * Operations regarding the backend related to project
 * management
 */

var Q = require('q');
var _ = require('lodash');
var request = require('superagent');
var CJM = require('carbono-json-messages');
var pjson = require('../../../../package.json');
var uuid = require('node-uuid');
var CONSTANTS = require('../../constants');

/**
 * Class responsible for dealing with the projects service.
 */
function ProjectsServiceClient(config) {
    this.config = config;
    this.redirectService = config.redirectService;
}

ProjectsServiceClient.prototype.read = function () {
    var token = window.localStorage.getItem("token");
    var defer = Q.defer();

    var defaultImage = '../../../iris/img/placeholder-project-img.png';
    var redirectService = this.redirectService;

    request
        .get(CONSTANTS.api.getProjects)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err) {
                if (err.status === 401) {
                    redirectService.redirectLogin();
                } else {
                    defer.reject(err);
                }
            } else {
                if (res && res.body && res.body.data) {
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
                    if (res && res.body) {
                        defer.reject(res.body.error);
                    } else {
                        defer.reject();
                    }
                }
            }
        });

    return defer.promise;
};

ProjectsServiceClient.prototype.buildCJM = function (data) {
    var cjm = new CJM({apiVersion: pjson.version});
    cjm.setData(data);
    return cjm.toObject();
};

ProjectsServiceClient.prototype.create = function (projectData) {
    var defer = Q.defer();
    var createProjectObj = this.buildCJM(
        {
            id: uuid.v4(),
            items: [
                {
                    name: projectData.name,
                    description: projectData.description,
                },
            ],
        }
    );

    var token = window.localStorage.getItem("token");
    var redirectService = this.redirectService;

    request
        .post(CONSTANTS.api.createProject)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send(createProjectObj)
        .end(function (err, res) {
            if (err) {
                if (err.status === 401) {
                    redirectService.redirectLogin();
                } else {
                    defer.reject(err);
                }
            } else {
                if (res) {
                    if (res.body.data) {
                        defer.resolve(res.body.data.items[0].project);
                    } else {
                        defer.reject(res.body.error);
                    }
                } else {
                    console.log(res.body.error)
                    defer.reject();
                }
            }
        });

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
