/**
 * Created by Sahil Sharma on 6/15/2017.
 */
/**
* LoginController
* @namespace thinkster.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace LoginController
  */
  function LoginController($location, $scope, Authentication) {
    var vm = this;
    vm.login = login;



    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.authentication.controllers.LoginController
    */
    function activate() {
        // If the user is authenticated, they should not be here.

        if (Authentication.isAuthenticated()) {
            console.log(Authentication.getAuthenticatedAccount())
            $location.url('/');
        }
        else
        {
          console.log(Authentication.isAuthenticated())
        }

    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf thinkster.authentication.controllers.LoginController
    */
    function login() {
      (Authentication.login(vm.email, vm.password))
        console.log(Authentication.getAuthenticatedAccount())


    }
  }
})();