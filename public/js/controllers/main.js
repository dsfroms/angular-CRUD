angular.module('myApp')
    .controller('navCtrl', function ($scope, $location) {
        $scope.states = {};
        $scope.states.activeItem = '';
        $scope.items = [
            {
                title: 'Show Herbs', href: '/showHerbs'
            },
            {
                title: 'add Herb', href: '/addHerb'
            }
        ];

        $scope.$on('$routeChangeSuccess', function () {
            $scope.states.activeItem = $location.path();
        });
    });


angular.module('myApp')
    .controller('CarouselCtrl', function ($scope, Herb) {

    $scope.slides = [];
    $scope.myInterval = 10000;

    Herb.get({page: 2, limit: 3},
        function (items) {
            $scope.slides = items.herbs;
        });

});
