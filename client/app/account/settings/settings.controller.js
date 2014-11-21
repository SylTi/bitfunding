'use strict';

/*jshint camelcase:false*/

angular.module('bitCrowdFundsApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
    $scope.isCollapsed = true;


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

    $scope.doCollaspe = function ()
    {
      $scope.isCollapsed = !$scope.isCollapsed;
      $scope.fee = 5;//process.env.FEE_WITHDRAW;
      $scope.cost = ($scope.user.balance * $scope.fee) / 100;
      $scope.rest = $scope.user.balance - $scope.cost;
    };

    $scope.doSendFunds = function ()
    {
      var obj = {};
      obj.userId = $scope.user._id;
      obj.addrBTC = $scope.btcAddr;

      $http.post('/api/refunds/', obj)
      .success(function ()
      {
        $scope.message = 'You request have been sent to review, your balance is now 0';
      })
      .error(function (error)
      {
        $scope.message = error;
      });
    };
  });
