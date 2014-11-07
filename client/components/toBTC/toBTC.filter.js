'use strict';

angular.module('bitCrowdFundsApp')
  .filter('toBTC', function () {
    return function (satoshi) {
      return (satoshi / 100000000).toFixed(4);
    };
  });
