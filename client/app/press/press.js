'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/press', {
        title: 'Bitfunding in the Press',
        templateUrl: 'app/press/press.html',
        controller: 'PressCtrl'
      });
  });
