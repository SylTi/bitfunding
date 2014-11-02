'use strict';

angular.module('bitCrowdFundsApp')
  .controller('DashboardCtrl', function ($scope, DashboardRes) {
    $scope.message = 'Hello';
    $scope.datas = DashboardRes.query();
  });
