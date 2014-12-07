'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/privacypolicy', {
        title: 'Privacy Policy',
        templateUrl: 'app/privacypolicy/privacypolicy.html',
        controller: 'PrivacypolicyCtrl'
      });
  });
