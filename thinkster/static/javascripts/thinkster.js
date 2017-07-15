        var app = angular.module('thinkster',['ngCookies','ngRoute','ngDialog'])
        .config(function($interpolateProvider,$routeProvider,$locationProvider) {

        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');


        $routeProvider.when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '/static/register.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/login.html'
        }).when('/', {
            controller: 'IndexController',
            controllerAs: 'vm',
            templateUrl: '/static/layout/index.html'
            }).when('/+:username', {
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/profile.html'
        }).when('/+:username/settings', {
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/settings.html'
        }).otherwise('/');
        }).run(function ($http) {
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
        })