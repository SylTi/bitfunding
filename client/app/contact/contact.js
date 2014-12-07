'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contact', {
        title: 'Contact Us',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });
