'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProfileCtrl', function ($scope, UserProfile, $routeParams, $location) {
    $scope.user = {};
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
              }
            }, function() {
              $location.path('/');
        });
    };
  });
