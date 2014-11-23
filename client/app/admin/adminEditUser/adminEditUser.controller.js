'use strict';

/*jshint camelcase:false*/

angular.module('bitCrowdFundsApp')
  .controller('AdminedituserCtrl', function ($scope, $http, $routeParams) {
    $scope.errors = {};

    $http.get('/api/users/admin/' + $routeParams.userId)
    .success(function(data)
    {
      $scope.user = data;
      console.log(data);
    }).error(function (data)
    {
      $scope.message_settings = 'Something wrong happend' + data;
    });

    $scope.changeSettings = function(form) {
      $scope.submitted = true;
      $http.put('/api/users/' + $scope.user._id + '/settings', $scope.user)
      .success(function ()
      {
        $scope.message_settings = 'Profile updated.';
      })
      .error( function() {
        form.password.$setValidity('mongoose', false);
        $scope.errors.other = 'Unknown error';
        $scope.message_settings = 'Unknown error';
      });

    };

  });
