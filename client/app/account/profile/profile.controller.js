'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProfileCtrl', function ($scope, UserProfile, $routeParams, $location, UserProjects) {
    $scope.user = {};
    $scope.projects = false;
    $scope.init = function() {
        UserProfile.get({name: $routeParams.name}).
            $promise.then(function(datas) {
              if (!datas.name)
              {
                $location.path('/');
              }
              else
              {
                $scope.user = datas;
                $scope.projects = UserProjects.query({name:$routeParams.name});
              }
            }, function() {
              $location.path('/');
        });
    };
  });
