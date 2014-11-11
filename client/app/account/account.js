'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        title: 'Login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        title: 'Signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        title: 'Settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/dashboard', {
        title: 'Dashboard',
        templateUrl: 'app/account/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      });
  });
