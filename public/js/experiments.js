angular.module('experimentApp', []).controller('ExperimentController', function ($scope, $http, $q) {


    var config = {};
    var allRuns = 0;
    var failureRuns = 0;
    var failedExperiments = 0;

    function init() {
        if (config.backendExperimentUrl) {
            $http.get(config.backendExperimentUrl).success(function (data) {
                $scope.experiments = [];
                var promises = [];
                data.forEach(function (experiment, i) {
                    promises.push($http.get(experiment._links[0].href))
                });
                $q.all(promises).then(function (responses) {
                    processBatchResponse(data, responses);
                    drawChart("#experimentChart", $scope.experiments.length, failedExperiments);
                    drawChart("#runChart", allRuns, failureRuns);
                });
            });
        } else {
            throw new Error("Needs experiment backend URL");
        }
    }

    function processBatchResponse(experiments, responses) {
        experiments.forEach(function (experiment, i) {
            var runs = responses[i].data;
            console.log(runs)
            parseRunsForExperiment(experiment, runs);
        });
    }

    function parseRunsForExperiment(experiment, experimentRuns) {
        console.log(experimentRuns.length + " runs in experiment " + experiment.experiment_name)
        if (experimentRuns.length > 0) {
            var experimentCopy = angular.copy(experiment);
            var lastRun = experimentRuns[experimentRuns.length - 1];
            failedExperiments += (lastRun.failure_execution ? 1 : 0);
            $scope.experiments.push(angular.merge(experimentCopy, lastRun));
        }
        experimentRuns.forEach(function (er) {
            allRuns = allRuns + 1;
            failureRuns += (er.failure_execution ? 1 : 0);
        });
    }

    function loadConfig() {
        $http.get('config.json').then(function (response) {
            config = response.data;
            init();
        });
    }

    // Start
    loadConfig();


    $scope.rerun = function (rerunLink) {
        $http.get(rerunLink).success(function () {
            init();
        });
    }
});
