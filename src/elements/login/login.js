(function () {
    'use strict';

    // Register the element with Polymer
    Polymer({
        is: 'carbo-login',

        properties: {
            services: {
                type: Object
            },
            lastPath: {
                type: String,
                notify: true
            }
        },

        ready: function () {
            var EMAIL_MAX_LENGTH    = 200;
            var PASSWORD_MAX_LENGTH = 60;
            var thisElement = this;

            // setar todos os values de input para 0 quando abre o form
            this.email = "";
            this.password = "";

            // remove class error from input-container -email and password
            this.toggleClass('error', false, this.$$('form input'));

            function _enableDisableSubmitButton () {
                // check if input validations are true
                var isValid = thisElement.validEmail && thisElement.validPassword;
                thisElement.toggleAttribute('disabled', !isValid, thisElement.$$('form button'));
            }

            function _checkEmail () {
                var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

                var value = thisElement.email;

                thisElement.validEmail = testEmail.test(value) && value.length <= EMAIL_MAX_LENGTH;

                thisElement._toggleError(thisElement.$$('form input[name="email"]'), !thisElement.validEmail);

                _enableDisableSubmitButton();
            }

            function _checkPassword () {
                thisElement.validPassword = thisElement.password.length > 0 && thisElement.password.length <= PASSWORD_MAX_LENGTH;

                _enableDisableSubmitButton();
            }

            this.$$('form input[name="email"]').addEventListener("keyup", _checkEmail);
            this.$$('form input[name="email"]').addEventListener("focusout", _checkEmail);
            this.$$('form input[name="password"]').addEventListener("keyup", _checkPassword);
            this.$$('form input[name="password"]').addEventListener("focusout", _checkPassword);

            _enableDisableSubmitButton();
        },

        submit: function (ev) {
            ev.preventDefault();

            var thisElement = this;

            this.services.userService.login({
                email: this.email,
                password: this.password
            }).then(
                function (token) {
                    thisElement.services.localStorage.setItem("token", token);
                    thisElement._toggleError(thisElement.$$('form input[name="password"]'), false);
                    thisElement.services.redirectService.redirectTo(thisElement.lastPath);
                },
                function (err) {
                    thisElement.password = "";
                    thisElement._toggleError(thisElement.$$('form input[name="password"]'), true);
                }
            );
        },

        _toggleError: function (input, toggle) {
            var container = Polymer.dom(input.parentNode);
            this.toggleClass('error', toggle, container);
        }
    });
})();
