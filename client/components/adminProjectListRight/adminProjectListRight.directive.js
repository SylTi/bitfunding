'use strict';

/*jshint unused:false */

angular.module('bitCrowdFundsApp')
  .directive('adminProjectListRight', function () {
    return {
      templateUrl: 'components/adminProjectListRight/adminProjectListRight.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
