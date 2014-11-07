'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/footer', {
        templateUrl: 'components/footer/footer.html',
        controller: 'FooterCtrl'
      });
  });
