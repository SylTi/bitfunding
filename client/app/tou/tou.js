'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tou', {
        templateUrl: 'app/tou/tou.html',
        controller: 'TouCtrl'
      });
  });
