// External dependencies
var page = require('page');

window.addEventListener('WebComponentsReady', function () {

    // Get the main element
    var carbo = document.getElementById('carbo');

    page('/', function () {
        carbo.route = 'home';
    });

    page('/login', function () {
        carbo.route = 'login';
    });

    page('/user/:userId', function (data) {
        carbo.route = 'user';
        carbo.user = data.params.userId;
    });

    // add #! before urls
    page({
        hashbang: true
    });
});

module.exports = page;
