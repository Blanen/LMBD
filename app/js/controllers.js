var movieControllers = angular.module('movieControllers', []);

movieControllers.controller('MovieListCtrl', [
    '$scope',
    '$localStorage',
    '$http',
    function ($scope, $localStorage, $http) {
        $scope.storage = $localStorage;
        
        if(typeof $localStorage.movies === 'undefined' || $localStorage.movies === null){
            $http.get('/app/movies_data/movies.json').then(function(response){
                console.log($localStorage.movies);
                $localStorage.movies = response.data;
                console.log('SUCCESS');
                console.log($localStorage.movies);
            }, function(response){
                console.log("FAILED");
            });
        }
        else{
            console.log('NOT UNDEFINED');
        }

        
    }]);

movieControllers.controller('MovieDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.movieId = $routeParams.movieId;
    }]);

movieControllers.controller('MovieAddCtrl', [
        '$scope',
        '$localStorage',

    function($scope, $localStorage) {
        console.log('MOVIEADDCONTROLLER');
        
        
        $scope.addToList = function(movie){
            var highest_id = getHighestId($localStorage.movies);
            $localStorage.movies.push({
                "year": movie.year,
                "name": movie.name,
                "id": highest_id});
        };
    }]);

movieControllers.controller('MovieRemoveCtrl', [
    '$scope',
    '$localStorage',

    function($scope, $localStorage) {
        $scope.removeFromList = function(element){
            console.log("REMOVE ITEM");
            var index = $localStorage.movies.indexOf(element);
            if(index> -1){
                $localStorage.movies.splice(index, 1);
            }
        };
    }
])
movieControllers.controller('MoviesResetCtrl', [
    '$scope',
    '$localStorage',
    '$route',

    function($scope, $localStorage, $route) {
        $scope.resetMovies = function() {
            console.log("RESET!");
            delete $localStorage.movies;
            $route.reload();
        };
    }
])

var getHighestId = function(array){
    var highest_id = null;

    if(array.length === 0){
        return 0;
    }

    array.forEach(function(element) {
        if(element.id > highest_id){
            highest_id = element.id;
            console.log(element.id);
        }
    }, this);

    return highest_id;
}