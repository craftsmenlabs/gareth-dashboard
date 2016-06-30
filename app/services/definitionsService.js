'use strict';

angular.module('garethApp')
  .service('definitionsService', function ($http, backendUrl) {
    var service = {};
    service.getDefinitions = getDefinitions;

    return service;

    function getDefinitions(type, query) {
      return $http.get(backendUrl + "/definitions/" + type + "/" + query).then(handleSuccess, handleError('Error getting scenarios'));
    }

    function handleSuccess(res) {
      return {success: true, data: res.data};
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }

  });
