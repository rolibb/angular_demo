'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.build.controller',
  'myApp.build.service',
  "googlechart"
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/build'});
}]);