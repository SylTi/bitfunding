'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        title: 'Home',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
