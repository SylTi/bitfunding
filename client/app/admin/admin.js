'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        title: 'Admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/:userId/editUser', {
        title: 'Admin Edit User',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'AdminedituserCtrl'
      });
  });
