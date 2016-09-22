'use strict';

angular
    .module('garethApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'modules/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
    });
