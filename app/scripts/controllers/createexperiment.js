'use strict';

/**
 * @ngdoc function
 * @name garethApp.controller:CreateexperimentCtrl
 * @description
 * # CreateexperimentCtrl
 * Controller of the garethApp
 */
angular.module('garethApp')
  .controller('CreateexperimentCtrl', function ($scope, $http, $q) {
    $scope.experiment = {};

    $scope.baseline = {};
    $scope.baseline.querySearch = queryDefinitions;

    $scope.assume = {};
    $scope.assume.querySearch = queryDefinitions;

    $scope.time = {};
    $scope.time.querySearch = queryDefinitions;

    $scope.success = {};
    $scope.success.querySearch = queryDefinitions;

    $scope.failure = {};
    $scope.failure.querySearch = queryDefinitions;

    $scope.create = function () {
      console.log(JSON.stringify($scope.experiment));
      $http.post("http://localhost:8080/definitions", $scope.experiment
      ).then(handleSuccess, handleError('Error executing command'));
    };

    function queryDefinitions(type, query) {
      var deferred = $q.defer();

      function deferredQueryDefinitions() {
        if (query && query.length <= 0) {
          return [];
        }

        $http.get("http://localhost:8080/definitions/" + type + "/" + query).then(handleSuccess, handleError('Error executing command')).then(function (definition) {
          console.log(JSON.stringify(definition));
          var results = [];

          if (definition.suggestions && definition.suggestions.length > 0) {
            results = definition.suggestions.map(function (suggestion) {
              return {
                value: suggestion,
                display: suggestion
              };
            });
          }

          deferred.resolve(results);
        });
      }

      _.debounce(deferredQueryDefinitions, 0, true)();

      return deferred.promise;
    }

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }

  })
;
