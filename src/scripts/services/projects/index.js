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

ProjectsServiceClient.prototype.read = function (query) {
    var defer = Q.defer();

    request
        .get('/scripts/services/projects/mock-data.json')
        .set('Accept', 'application/json')
        .end(function (err, res) {

            // Mock
            setTimeout(function () {

                var filteredRes = _.filter(res.body, function (d) {
                    return _.every(query, function (value, prop) {
                        return d[prop] === value;
                    });
                });

                defer.resolve(filteredRes);

            }, 500);
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
        .set('crbemail', 'casadei@email.com')
        .set('Accept', 'application/json')
        .send(createProjectObj)
        .end(function (err, res) {

            // Mock
            setTimeout(function () {

                console.log(res.body)

            }, 1000);
        });

    return defer.promise;
};

// export the class
module.exports = ProjectsServiceClient;
