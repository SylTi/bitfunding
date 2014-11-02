'use strict';

angular.module('bitCrowdFundsApp')
  .controller('DashboardCtrl', function ($scope, MyProjects, DashboardRes) {
    $scope.datas = DashboardRes.query();
    $scope.projects = MyProjects.query();
  });
