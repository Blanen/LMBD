var movieApp = angular.module('movieApp', [
    'ngRoute',
    'movieControllers',
    'ngStorage'
]);

movieApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/movie-list.html',
                controller: 'MovieListCtrl'
            }).
            when('/movies/:movieId', {
                templateUrl: 'partials/movie-list.html',
                controller: 'MovieDetailCtrl'
            }).
            when('/movies', {
                templateUrl: 'partials/movie-list.html',
                controller: 'MovieListCtrl'
            });
    }]);