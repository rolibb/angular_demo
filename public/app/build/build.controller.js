'use strict';

angular.module('myApp.build.controller', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/build', {
        templateUrl: 'app/build/build.html',
        controller: 'buildController'
    });
}])

.controller('buildController', ['$scope', 'buildService', '$routeParams', function($scope, buildService, $routeParams) {

    $scope.data = buildService.get().then(function (builds) {
        var buildJson = [];

        for(var i = 0; i < builds.length; i++){
            console.log(builds[i]);

            var build = {};

            build = builds[i];

            build.chartUnitTest = {},
            build.chartOFuntionalTest = {};
            build.showBuilds = true;
            build.titleDetail = "Show Detail " + build.changeList;

            buildJson.push(build);
        };

        $scope.builds = buildJson;
    });

    function chartObject(dataObject){

        var chartObject = {};

        chartObject.type = "PieChart";

        chartObject.data = {
            "cols": [
                {id: "t", label: "Pizza", type: "string"},
                {id: "s", label: "Populartiy", type: "number"}
            ],
            "rows": [
            {c: [
                {v: dataObject.passed_2.value},
                {v: dataObject.passed_2.p}
            ]},
            {c: [
                {v: dataObject.passed_1.value},
                {v: dataObject.passed_1.p},
            ]}
        ]};

        chartObject.options = {
            'legend': 'none',
            'pieSliceText': 'label',
            'pieStartAngle': 50,
            'colors': ['#eb7d3b', '#72ac4d'],
            'pieSliceTextStyle': {
                color: 'black'
            }
        };

        return chartObject;
    }

    $scope.viewDetails = function(build){

        if(build.viewDetail == false){
            build.viewDetail = true;
            build.showBuilds = false;
            build.titleDetail = "Hide Detail " + build.changeList;
            if(build.unitTest.passed_1){
                build.chartUnitTest = chartObject(build.unitTest);
            }

            if(build.funtionalTest.passed_1){
                build.chartOFuntionalTest = chartObject(build.funtionalTest);
            }

        }else if(build.viewDetail == true){

            build.viewDetail = false;
            build.showBuilds = true;
            build.titleDetail = "Show Detail " + build.changeList;

        }

        return build;
    }


    $scope.trClass = function(build){

        var cssClass = "";

        switch(build.state) {
          case "Pending":
            cssClass = "border-default";
            break;
          case "Running":
            cssClass = "border-primary";
            break;
          case "Rejected":
            cssClass = "border-danger";
            break;
          case "Complete":
            cssClass = "border-success";
            break;
          case "Accepted":
            cssClass = "border-success";
            break;
        }

        return cssClass;
  }

}]);