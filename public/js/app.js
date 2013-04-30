'use strict';


angular.module('herbsServices', ['ngResource']); 
angular.module('showHerbs', []); 
angular.module('AEHerb', []);


// Declare app level module 
angular.module('myApp', ['ui.bootstrap', 'herbsServices', 'showHerbs', 'AEHerb']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home',
                controller: 'CarouselCtrl'
            }).
            when('/showHerbs', {
                templateUrl: 'partials/showHerbs',
                controller: 'ShowHerbsCtrl'
            }).
            when('/showHerb/:Id', {
                templateUrl: 'partials/showHerb',
                controller: 'showHerbCtrl'
            }).
            when('/addHerb', {
                templateUrl: 'partials/editHerb',
                controller: 'addHerbCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
