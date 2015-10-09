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

ProjectsServiceClient.prototype.create = function (data) {

    var defer = Q.defer();

    setTimeout(function () {

        defer.resolve({
            id: _.uniqueId('project_')
        });

    }, 1000);

    return defer.promise;
};

// export the class
module.exports = ProjectsServiceClient;
