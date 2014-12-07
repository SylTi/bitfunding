'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/faq', {
        title: 'FAQ',
        templateUrl: 'app/faq/faq.html',
        controller: 'FaqCtrl'
      });
  });
