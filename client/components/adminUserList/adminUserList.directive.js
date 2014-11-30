'use strict';
/*jshint unused:false*/

angular.module('bitCrowdFundsApp')
  .directive('adminUserList', function () {
    return {
      templateUrl: 'components/adminUserList/adminUserList.html',
      restrict: 'EA',
      scope: {
        user: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
