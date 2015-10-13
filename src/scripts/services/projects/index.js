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

ProjectsServiceClient.prototype.read = function (query) {
    var defer = Q.defer();
    var getProjectsUrl = 'http://localhost:7888/account-manager/projects';
    request
        .get(getProjectsUrl)
        .set('Content-Type', 'application/json')
        .set('crbemail', 'casadei@email.com')
        .set('Accept', 'application/json')
        .end(function (err, res) {

            setTimeout(function () {
                var projects = [];
                for (var i in res.body.data.items) {
                    try {
                        var dateAux = new Date(res.body.data.items[i].project.modifiedAt);
                        res.body.data.items[i].project.modifiedAt = formatBrDate(dateAux);
                        dateAux = new Date(res.body.data.items[i].project.createdAt);
                        res.body.data.items[i].project.createdAt = formatBrDate(dateAux);
                        projects.push(res.body.data.items[i].project);
                    } catch (e) {
                        // Log
                        res.body.data.items[i].project.modifiedAt = formatBrDate(new Date());
                        res.body.data.items[i].project.createdAt = formatBrDate(new Date());
                        projects.push(res.body.data.items[i].project);
                    }
                    
                }
                defer.resolve(projects);

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

var formatBrDate = function(date) {
    var months = ['jan','fev','mar','abr','jun','jul','ago',
    'set','out','nov','dez'];
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' +
    date.getFullYear();
};

// export the class
module.exports = ProjectsServiceClient;
