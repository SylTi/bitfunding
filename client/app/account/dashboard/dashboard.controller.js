'use strict';


angular.module('bitCrowdFundsApp')
  .controller('DashboardCtrl', function ($scope, MyProjects, DashboardRes, Auth) {
    $scope.datas = DashboardRes.query();
    $scope.projects = MyProjects.query();
    $scope.userData = Auth.getCurrentUser();
    $scope.unconfirmed = function()
    {
      if ($scope.userData.unconfirmedBalance > 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    };
  });
