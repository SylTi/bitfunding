'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        title: 'Admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
