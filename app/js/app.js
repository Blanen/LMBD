var movieApp = angular.module('movieApp', [
    'ngRoute',
    'movieControllers',
    'ngStorage'
]);

movieApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: "HomeCtrl"
            }).
            when('/movies/id/:movieId', {
                templateUrl: 'partials/movie-detail.html',
                controller: 'MovieDetailCtrl'
            }).
            when('/movies', {
                templateUrl: 'partials/movie-list.html',
                controller: 'MovieListCtrl'
            });
    }]);