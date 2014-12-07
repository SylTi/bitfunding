'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tou', {
        title: 'Terms of Use',
        templateUrl: 'app/tou/tou.html',
        controller: 'TouCtrl'
      });
  });
