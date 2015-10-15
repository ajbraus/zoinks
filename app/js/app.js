'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 
                         'myApp.services', 
                         'myApp.directives', 
                         'myApp.controllers',
                         'ngAnimate',
                         'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
       $routeProvider.when('/home', {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
       });

       $routeProvider.when('/zoink/:id', {
          templateUrl: 'partials/zoink-show.html',
          controller: 'ZoinkShowCtrl'
       });

       $routeProvider.when('/chat', {
          templateUrl: 'partials/chat.html',
          controller: 'ChatCtrl'
       });

       $routeProvider.when('/account', {
          authRequired: true, // must authenticate before viewing this page
          templateUrl: 'partials/account.html',
          controller: 'AccountCtrl'
       });

       $routeProvider.when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
       });

       $routeProvider.otherwise({redirectTo: '/home'});
    }]);