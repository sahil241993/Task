/**
 * Created by Sahil Sharma on 6/15/2017.
 */
/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookieStore', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookieStore, $http,$scope) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */

    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
  isAuthenticated: isAuthenticated,
  login: login,
   logout: logout,
        register: register,
  setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate,
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
      username: username,
      password: password,
      email: email
  }).then(registerSuccessFn, registerErrorFn);

  /**
  * @name registerSuccessFn
  * @desc Log the new user in
  */
  function registerSuccessFn(response) {
    Authentication.login(email, password);
  }

  /**
  * @name registerErrorFn
  * @desc Log "Epic failure!" to the console
  */

  function registerErrorFn(data, status, headers, config) {

    console.error('Epic failure!');
  }
}

    /**
 * @name login
 * @desc Try to log in with email `email` and password `password`
 * @param {string} email The email entered by the user
 * @param {string} password The password entered by the user
 * @returns {Promise}
 * @memberOf thinkster.authentication.services.Authentication
 */




    function logout() {
  return $http.post('/api/v1/auth/logout/')
    .then(logoutSuccessFn, logoutErrorFn);

  /**
   * @name logoutSuccessFn
   * @desc Unauthenticate and redirect to index with page reload
   */
  function logoutSuccessFn(data, status, headers, config) {
    Authentication.unauthenticate();

    window.location = '/';
  }

  /**
   * @name logoutErrorFn
   * @desc Log "Epic failure!" to the console
   */
  function logoutErrorFn(data, status, headers, config) {
    console.error('Epic failure!');
  }
}

function login(email, password) {
  return $http.post('api/v1/auth/login/', {
    email: email, password: password
  }).then(loginSuccessFn,loginErrorFn);

function loginSuccessFn(data, status, headers, config) {
    Authentication.setAuthenticatedAccount(data.data);

    window.location = '/';
  }
   //     function loginSuccessFn(response) {
    //      console.log("hello")
     //     console.log(response)
      //  }
//function loginErrorFn(response) {
 //         console.log("error")
  //  console.log(response)
//}
  /**
   * @name loginErrorFn
   * @desc Log "Epic failure!" to the console
   */
  function loginErrorFn(data, status, headers, config) {
    console.log(data.data.message);
    console.error('Epic failure!');
    return data.data.message
  }

}

function getAuthenticatedAccount() {
      if(Authentication.isAuthenticated())
        return JSON.parse($cookieStore.get('authenticatedAccount'));
      else return "not"
}

function isAuthenticated() {
  if($cookieStore.get('authenticatedAccount'))
    return true;
  return false;
}


function setAuthenticatedAccount(account) {
  $cookieStore.put('authenticatedAccount', JSON.stringify(account));
  console.log(JSON.parse($cookieStore.get('authenticatedAccount')))
}

function unauthenticate() {
  $cookieStore.remove("authenticatedAccount");
}



  }
})();