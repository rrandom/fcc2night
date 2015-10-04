'use strict';

angular.module('fcc2nightlifeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, cacheBar) {
    var dbBarList = [];

    $scope.awesomeThings = [];
    $scope.location = '';
    $scope.bars = cacheBar.data.bars;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.searchBars = function () {
      $http.get('/api/bars/search', {
        params: {
          location: $scope.location
        }
      }).success(function (data) {
        var newBars = data.businesses;
        $http.get('/api/bars/').success(function (dbBars) {
          dbBarList = dbBars.map(function (bar) {
            return bar.url;
          });
          for (var i = 0; i < newBars.length; i++) {
            var barIndex = dbBarList.indexOf(newBars[i].url);
            if (barIndex === -1) {
              newBars[i].attending = [];
            } else {
              newBars[i]._id = dbBars[barIndex]._id;
              newBars[i].attending = dbBars[barIndex].attending;
            }
          }

          $scope.bars = newBars;
          cacheBar.update($scope.bars);
        });
      });
    };

    $scope.going = function (bar) {
      var user = $scope.getCurrentUser();
      if (user._id === undefined) {
        $location.path('/login');
      } else {
        var userIndex = bar.attending.indexOf(user._id);
        if (userIndex === -1) {
          bar.attending.push(user._id);
        } else {
          // delete user
          bar.attending[userIndex] = null;
          bar.attending = bar.attending.filter(function (user) {
            return user !== null;
          });
        }
        if (dbBarList.indexOf(bar.url) === -1) {
          // create
          $http.post('/api/bars/', bar).success(function () {
            console.log('going!');
          });
        } else {
          // update
          $http.put('/api/bars/' + bar._id, bar).success(function () {
            console.log('Not going!');
          });
        }
      }
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
