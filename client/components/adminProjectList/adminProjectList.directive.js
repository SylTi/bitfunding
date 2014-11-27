'use strict';

angular.module('bitCrowdFundsApp')
  .directive('adminProjectList', function () {
    return {
      templateUrl: 'components/adminProjectList/adminProjectList.html',
      restrict: 'EA',
      scope: {
        projects: '='
      }/*,
      link: function (scope, element, attrs)
      {

      }*/
    };
  });
