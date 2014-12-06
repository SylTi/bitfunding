'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/privacypolicy', {
        templateUrl: 'app/privacypolicy/privacypolicy.html',
        controller: 'PrivacypolicyCtrl'
      });
  });
