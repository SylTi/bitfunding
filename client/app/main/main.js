'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        title: 'Bitcoin Crowdfunding Platform',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
