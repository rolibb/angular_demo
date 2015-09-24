'use strict';

angular.module('myApp.build.service', [])
.factory('buildService', function($http, $q){
	return {
        get: function(){

        	var deferred;

            deferred = $q.defer();

        	$http.get('data/data.json').success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                console.error(data, status, headers, config);
                deferred.reject(data);
            });

        	return deferred.promise;
        }
    };
});