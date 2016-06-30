'use strict';

angular
  .module('garethApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/createExperiment', {
        templateUrl: 'modules/experiments/createexperiment.html',
        controller: 'CreateexperimentCtrl',
        controllerAs: 'createExperiment'
      })
  });
