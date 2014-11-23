'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile/:name', {
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });
