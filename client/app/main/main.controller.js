'use strict';

angular.module('fcc2nightlifeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.location = '';
    $scope.bars = [];


    $scope.searchBars = function () {

      $http.get('/api/bars/search', {
        params: {
          location: $scope.location
        }
      }).success(function (data) {
        $scope.bars = data.businesses;
      })
    };

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
