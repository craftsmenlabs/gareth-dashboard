'use strict';

/**
 * @ngdoc function
 * @name garethApp.controller:CreateexperimentCtrl
 * @description
 * # CreateexperimentCtrl
 * Controller of the garethApp
 */
angular.module('garethApp')
  .controller('CreateexperimentCtrl', function ($scope, $http) {
    $scope.experiment = {};

    $scope.create = function () {
      // var result = JSON.parse($scope.jsonString);
      console.log(JSON.stringify($scope.experiment));
      // console.log(JSON.stringify(experiment2));

      $http.post("http://localhost:8080/definitions", $scope.experiment
      ).then(handleSuccess, handleError('Error executing command'));
    };

    function handleSuccess(res) {
      console.log(JSON.stringify(res));
      return res.data;
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }
  })
;
