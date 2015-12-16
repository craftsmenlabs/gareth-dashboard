angular.module('experimentApp', []).controller('ExperimentController', function ($scope, $http) {


    var config = {};


    function init() {
        if (config.backendExperimentUrl) {
            $http.get(config.backendExperimentUrl).success(function (data) {
                $scope.experiments = [];

                data.forEach(function (experiment, i) {
                    $http.get(experiment._links[0].href).success(function (experimentRun) {
                        experimentRun.forEach(function (er) {
                            var experimentCopy = angular.copy(experiment);
                            $scope.experiments.push(angular.merge(experimentCopy, er));
                        });
                    });
                });
            });
        } else {
            throw new Error("Needs experiment backend URL");
        }
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
