'use strict';

/*jshint camelcase:false*/

angular.module('bitCrowdFundsApp')
  .controller('FooterCtrl', function ($scope, $http, CoindeskAPI) {
    $scope.coindesk_error = false;
    $scope.current_prices = {};
    $scope.current_prices = CoindeskAPI.query();
  });
