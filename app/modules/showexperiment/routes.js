'use strict';

angular
    .module('garethApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/showExperiment', {
                templateUrl: 'modules/showexperiment/showexperiment.html',
                controller: 'ShowExperimentCtrl',
                controllerAs: 'showExperiment'
            })
    });
