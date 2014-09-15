var app = angular.module('EdenBlue', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
            .when('/entorno', {
                templateUrl: 'templates/entorno.html',
                controller: 'entornoController'
            })
            .otherwise({
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            });
});