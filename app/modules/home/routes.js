'use strict';

angular
  .module('garethApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
  });
