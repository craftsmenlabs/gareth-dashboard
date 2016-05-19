'use strict';

/**
 * @ngdoc overview
 * @name garethApp
 * @description
 * # garethApp
 *
 * Main module of the application.
 */
angular
  .module('garethApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'ngMaterial'
  ])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('red');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/createExperiment', {
        templateUrl: 'views/createexperiment.html',
        controller: 'CreateexperimentCtrl',
        controllerAs: 'createExperiment'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
