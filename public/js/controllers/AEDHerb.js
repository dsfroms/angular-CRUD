'use strict';

/* Controllers */

angular.module('AEHerb')
    .controller('editHerbCtrl', function ($scope, $routeParams, $location, Herb, dialog) {
        $scope.Herb = Herb.get({id: $routeParams.Id});

        //use .$promise
        $scope.save = function () {
            Herb.update({id: $scope.Herb._id}, $scope.Herb, function (h) {
                dialog.close(h);
            });
        };

        $scope.cancel = function () {
            dialog.close();
        };
    });

angular.module('AEHerb')
    .controller('addHerbCtrl', function ($scope, $location, Herb) {

        $scope.save = function () {
            $scope.Herb.picture = 'Mint.jpg';
            Herb.save($scope.Herb, function (h) {
                $location.path('/showHerb/' + h._id);
            });
        };

        $scope.cancel = function () {
            $location.path('/');
        };
    });