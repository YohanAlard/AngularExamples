'use strict';
//main module -> myApp  depends on moduleRouge
var myApp = angular.module('myApp', ['moduleRouge']);
var moduleRouge = angular.module('moduleRouge', []);


myApp.controller('parentController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.color = 'yellow';
    $scope.parentChangeColor = function (color) {
        $scope.color = color;
        console.log($scope.color);
    }

    $scope.clickFunc = function clickFunc() {
        //broadcast to all scope children (even if it is in a separated module)
        $scope.$broadcast('newColor', "" + $scope.color)
    }
}]);

myApp.controller('blueController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.color = 'blue';
    $scope.makeParentblue = function clickFunc() {
        $scope.parentChangeColor('blue');
    }
    $scope.propagateBlue = function clickFunc() {
        //we have to use RootScope to broadcast to all children scopes
        $rootScope.$broadcast('newColor', "blue")
    }

    //listening broadcast event from parent controller
    $scope.$on('newColor', function (event, args) {
        $scope.color = args;
    });

}]);

moduleRouge.controller('redController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    //if not override, we get the parent color 
    console.log("Red Controler before override" + $scope.color); //=YELLOW
    //we can redefine color in the actual scope without modifying the parent scope. // looks like a copy.
    $scope.color = 'red';

    $scope.makeParentRed = function clickFunc() {
        //communication vers le controlleur parent toujours possible.
        $scope.parentChangeColor('red');
    }

    $scope.propagateRed = function clickFunc() {
        //we have to use RootScope to broadcast to all children scopes
        $rootScope.$broadcast('newColor', "red")
    };
    //listening broadcast event from parent controller
    $scope.$on('newColor', function (event, args) {
        $scope.color = args;
    });
}]);
