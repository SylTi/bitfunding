'use strict';

/*jshint camelcase:false*/

angular.module('bitCrowdFundsApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.changeSettings = function(form) {
      $scope.submitted = true;
        Auth.changeSettings( $scope.user )
        .then( function() {
          $scope.message_settings = 'Profile updated.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Unknown error';
          $scope.message_settings = 'Unknown error';
        });

    };
  });
