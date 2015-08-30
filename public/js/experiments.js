angular.module('experimentApp', []).controller('ExperimentController', function ($scope, $http) {
    $http.get(config.backendExperimentUrl).success(function (data) {
        $scope.experiments = data;
    });
});