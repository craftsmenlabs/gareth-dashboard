'use strict';

/**
 * @ngdoc function
 * @name garethApp.controller:CreateexperimentCtrl
 * @description
 * # CreateexperimentCtrl
 * Controller of the garethApp
 */
angular.module('garethApp')
  .controller('CreateexperimentCtrl', function ($scope, $http, $q, $mdDialog, definitionsService) {
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

      $scope.experiment.baseline_glueline = $scope.baseline.searchText;
      $scope.experiment.assume_glueline = $scope.assume.searchText;
      $scope.experiment.time_glueline = $scope.time.searchText;
      $scope.experiment.success_glueline = $scope.success.searchText;
      $scope.experiment.failure_glueline = $scope.failure.searchText;

      console.log(JSON.stringify($scope.experiment));


      $http.post("http://localhost:8080/definitions/", $scope.experiment
      ).then(handleSuccess, function () {
        var alert = $mdDialog.alert({
          title: "Error creating experiment",
          textContent: "All fields must match an existing glue line in Gareth.",
          ok: 'Close'
        });
        $mdDialog
          .show(alert)
          .finally(function () {
            alert = undefined;
          });
      });
    };

    function queryDefinitions(type, query) {
      var deferred = $q.defer();

      function deferredQueryDefinitions() {
        if (!query) {
          return [];
        }

        definitionsService.getDefinitions(type, query).then(function (res) {
            console.log(JSON.stringify(res));
            var results = [];

            if (res.success) {
              var definition = res.data;
              if (definition.suggestions && definition.suggestions.length > 0) {
                results = definition.suggestions.map(function (suggestion) {
                  return {
                    value: suggestion,
                    display: suggestion
                  };
                });
              }
            }

            deferred.resolve(results);
          }
        );
      }

      _.debounce(deferredQueryDefinitions, 0, true)();

      return deferred.promise;
    }

    function handleSuccess(res) {
      return res.data;
    }
  })
;
