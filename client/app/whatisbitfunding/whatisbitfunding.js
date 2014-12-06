'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/whatisbitfunding', {
        templateUrl: 'app/whatisbitfunding/whatisbitfunding.html',
        controller: 'WhatisbitfundingCtrl'
      });
  });
