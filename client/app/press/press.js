'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/press', {
        templateUrl: 'app/press/press.html',
        controller: 'PressCtrl'
      });
  });
