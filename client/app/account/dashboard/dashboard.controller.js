'use strict';


angular.module('bitCrowdFundsApp')
  .controller('DashboardCtrl', function ($scope, MyProjects, DashboardRes, Auth, CoindeskAPI) {
    $scope.datas = DashboardRes.query();
    $scope.projects = MyProjects.query();
    $scope.userData = Auth.getCurrentUser();
    $scope.currentPrices = {};
    $scope.currentPrices = CoindeskAPI.query(function (data)
      {
        $scope.currentPriceD = ($scope.userData.balance / 100000000) * data.bpi.USD.rate;
        $scope.currentPriceE = ($scope.userData.balance / 100000000) * data.bpi.EUR.rate;
        $scope.currentPriceP = ($scope.userData.balance / 100000000) * data.bpi.GBP.rate;
      });
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

    $scope.changePrice = function()
    {
     // $scope.currentPrices.bpi.USD.rate;
    };

  });
