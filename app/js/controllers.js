var movieControllers = angular.module('movieControllers', []);

movieControllers.controller('MovieListCtrl', [
    '$scope',
    '$localStorage',
    '$http',
    function ($scope, $localStorage, $http) {
        $scope.storage = $localStorage;

        if (typeof $localStorage.movies === 'undefined') {
            $http.get('/app/movies_data/movies.json').then(function (response) {
                $localStorage.movies = response.data;
                console.log("FAILED");
            });
        }
        else {
            console.log('NOT UNDEFINED');
        }


    }]);

movieControllers.controller('MovieDetailCtrl', [
    '$scope',
    '$routeParams',
    '$localStorage',
    '$location',

    function ($scope, $routeParams, $localStorage, $location) {
        var movieId = $routeParams.movieId;

        var result = getById($localStorage.movies, movieId);

        console.log($localStorage.movies);

        if(result != null){
            $scope.movie = result;
        }else{
            console.log("MOVIE NOT FOUND!");
            $location.path('/movies');
        }
    }]);

movieControllers.controller('MovieAddCtrl', [
    '$scope',
    '$localStorage',

    function ($scope, $localStorage) {
        console.log('MOVIEADDCONTROLLER');


        $scope.addToList = function (movie) {
            var highest_id = getHighestId($localStorage.movies);
            $localStorage.movies.push({
                "year": movie.year,
                "name": movie.name,
                "id": highest_id
            });
        };
    }]);

movieControllers.controller('ListItemCtrl', [
    '$scope',
    '$localStorage',
    '$location',

    function ($scope, $localStorage, $location) {
        $scope.removeFromList = function (element) {
            console.log("REMOVE ITEM");
            var index = $localStorage.movies.indexOf(element);
            if (index > -1) {
                $localStorage.movies.splice(index, 1);
            }
        };
        $scope.goToDetail = function(id) {
            console.log("GO TO DETAIL OF " + id);
            $location.path("/movies/id/" + id);

        }
    }
])
movieControllers.controller('MoviesResetCtrl', [
    '$scope',
    '$localStorage',
    '$route',

    function ($scope, $localStorage, $route) {
        $scope.resetMovies = function () {
            console.log("RESET!");
            delete $localStorage.movies;
            $route.reload();
        };
    }
])

movieControllers.controller('HomeCtrl', [
    '$scope',
    '$location',

    function ($scope, $location) {
        $scope.goToList = function() {
            console.log('GO TO LIST!');
            $location.path('/movies');
        };
    }
])

var getHighestId = function (array) {
    var highest_id = null;

    if (array.length === 0) {
        return 0;
    }

    array.forEach(function (element) {
        if (element.id > highest_id) {
            highest_id = element.id;
            console.log(element.id);
        }
    }, this);

    return highest_id;
}

var getById = function(array, id){
    var element = null;
    for(var i = 0; i< array.length; i++){
        if(array[i].id == id){
            return array[i];
        }
    }
    return element;
}