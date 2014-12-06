'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/faq', {
        templateUrl: 'app/faq/faq.html',
        controller: 'FaqCtrl'
      });
  });
