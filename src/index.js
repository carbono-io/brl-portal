// Scripts dependend upon
require('./bower_components/webcomponentsjs/webcomponents-lite.js');

var _ = require('lodash');

var carbo = document.getElementById('carbo');

carbo.test = 'test value';

carbo.router = require('./scripts/router');

carbo.user = require('./scripts/services/user');

carbo.handleLoginSubmit = function () {
    
};
