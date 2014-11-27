'use strict';

angular.module('bitCrowdFundsApp')
  .directive('adminUserList', function () {
    return {
      templateUrl: 'app/components/adminUserList/adminUserList.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });