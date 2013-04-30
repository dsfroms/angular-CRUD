'use strict';

/* Controllers */

angular.module('showHerbs')
    .controller('ShowHerbsCtrl', function ($scope, $location, Herb) {
        $scope.currentPage = 1;
        $scope.noOfPages = 0;
        var limit = 4;

        //$scope.$watch currentPage - option
        $scope.setPage = function (page) {
            Herb.get({page: page, limit: limit},
                function (items) {
                    $scope.herbs = items.herbs;
                    $scope.noOfPages = Math.ceil(items.size / limit);
                });
        }
        $scope.setPage(1);
    });

angular.module('showHerbs')
    .controller('showHerbCtrl', function ($scope, $routeParams, $location, $dialog, Herb) {

        $scope.Herb = Herb.get({id: $routeParams.Id});

        $scope.opts = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: 'partials/editHerb', 
            controller: 'editHerbCtrl'
        };

        $scope.openDialog = function () {
            var d = $dialog.dialog($scope.opts);
            d.open().then(function (result) {
                if (result) {
                    $scope.Herb = result;
                }
            });
        };

        $scope.delete = function () {
            Herb.delete({ id: $scope.Herb._id }, function () {
                $location.path('/showHerbs');
            });
        };

    });



