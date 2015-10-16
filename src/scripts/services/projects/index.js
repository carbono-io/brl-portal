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
    var createProjectsUrl = 'http://localhost:7888/account-manager/projects';
    request
        .post(createProjectsUrl)
        .set('Content-Type', 'application/json')
        .set('crbemail', projectData.email)
        .set('Accept', 'application/json')
        .send(createProjectObj)
        .end(function (err, res) {
            if (res.body.data) {
                defer.resolve(res.body.data.items[0].project);
            } else {
                defer.reject(res.body.error);
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
