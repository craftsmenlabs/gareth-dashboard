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
    $scope.jsonString = "";

    $scope.apply = function () {
      var result = JSON.parse($scope.jsonString);

        $http.post("http://localhost:8080/definitions", result
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
