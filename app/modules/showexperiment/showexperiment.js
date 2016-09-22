'use strict';

/**
 * @ngdoc function
 * @name garethApp.controller:ShowExperimentCtrl
 * @description
 * # ShowExperimentCtrl
 * Controller of the garethApp
 */
angular.module('garethApp')
    .controller('ShowExperimentCtrl', function ($scope, $location) {

        init();


        function init() {
            $scope.experiment = $scope.experimentToShow;
            console.log('showExperiment.js.');
            console.log($scope.experimentToShow);
        }


    });
