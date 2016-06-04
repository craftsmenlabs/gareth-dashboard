'use strict';

/**
 * @ngdoc function
 * @name garethApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the garethApp
 */
angular.module('garethApp')
  .controller('MainCtrl', function ($scope, $http, $q) {

    var config = {};
    $scope.allRuns = 0;
    $scope.failureRuns = 0;
    $scope.failedExperiments = 0;
    $scope.allExperiments = 0;

    function init() {
      if (config.backendExperimentUrl) {
        $http.get(config.backendExperimentUrl).success(function (data) {
          $scope.experiments = [];
          //an http.get needs to be done for each experiment. The responses are batched
          var promises = [];
          data.forEach(function (experiment, i) {
            promises.push($http.get(experiment._links[0].href))
          });
          $q.all(promises).then(function (responses) {
            processExperimentRunResults(data, responses);
            $scope.allExperiments = $scope.experiments.length;
            drawChart("#experimentChart", $scope.allExperiments, $scope.failedExperiments);
            drawChart("#runChart", $scope.allRuns, $scope.failureRuns);
          });
        });
      } else {
        throw new Error("Needs experiment backend URL");
      }
    }

    //responses is an array of experiment-run arrays
    function processExperimentRunResults(experiments, responses) {
      experiments.forEach(function (experiment, i) {
        parseRunsForExperiment(experiment, responses[i].data);
      });
    }

    function parseRunsForExperiment(experiment, experimentRuns) {
      if (experimentRuns.length > 0) {
        var experimentCopy = angular.copy(experiment);
        var lastRun = experimentRuns[experimentRuns.length - 1];
        $scope.failedExperiments += (lastRun.failure_execution ? 1 : 0);
        $scope.experiments.push(angular.merge(experimentCopy, lastRun));
      }
      experimentRuns.forEach(function (er) {
        $scope.allRuns = $scope.allRuns + 1;
        $scope.failureRuns += (er.failure_execution ? 1 : 0);
      });
    }

    function loadConfig() {
      //config = {'backendExperimentUrl': '/data/experiments.json'};
      config = {'backendExperimentUrl': 'http://localhost:8080/experiments'};

      init();
    }

    // Start
    loadConfig();


    $scope.rerun = function (rerunLink) {
      $http.get(rerunLink).success(function () {
        init();
      });
    }
  });
