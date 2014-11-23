'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProfileCtrl', function ($scope, UserProfile, $routeParams, $location, UserProjects) {
    $scope.user = {};
    $scope.contributions = {};
    $scope.projects = false;
    $scope.init = function() {
        UserProfile.get({name: $routeParams.name}).
            $promise.then(function(datas) {
              if (!datas.user)
              {
                $location.path('/');
              }
              else
              {
                $scope.user = datas.user;
                $scope.contributions = datas.contributions;
                $scope.projects = UserProjects.query({name:$routeParams.name});
              }
            }, function() {
              $location.path('/');
        });
    };
  });
