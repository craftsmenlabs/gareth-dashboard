angular.module('experimentApp', []).controller('ExperimentController', function ($scope, $http) {

    function init() {
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
    }

    init();

    $scope.rerun = function (rerunLink) {
        $http.get(rerunLink).success(function () {
            init();
        });
    }
});
