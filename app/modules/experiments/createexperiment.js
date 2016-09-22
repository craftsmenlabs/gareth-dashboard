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
            $scope.experiment.baselineGlueLine = $scope.baseline.searchText;
            $scope.experiment.assumeGlueLine = $scope.assume.searchText;
            $scope.experiment.timeGlueLine = $scope.time.searchText;
            $scope.experiment.successGlueLine = $scope.success.searchText;
            $scope.experiment.failureGlueLine = $scope.failure.searchText;

            definitionsService.createExperiment($scope.experiment).then(handleSuccess, function () {
                showErrorDialog();
            });
        };

        function queryDefinitions(type, query) {
            var deferred = $q.defer();

            function deferredQueryDefinitions() {
                if (!query) {
                    return [];
                }

                definitionsService.getDefinitions(type, query).then(function (res) {
                        var results = parseResults(res);
                        deferred.resolve(results);
                    }
                );
            }

            _.debounce(deferredQueryDefinitions, 0, true)();

            return deferred.promise;
        }

        function showErrorDialog() {
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
        }

        function parseResults(res) {
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
            return results;
        }

        function handleSuccess(res) {
            return res.data;
        }
    })
;
