'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/whatisbitfunding', {
        title: 'What is Bitfunding',
        templateUrl: 'app/whatisbitfunding/whatisbitfunding.html',
        controller: 'WhatisbitfundingCtrl'
      });
  });
