'use strict';
/*jshint unused:false*/

angular.module('bitCrowdFundsApp')
  .directive('adminProjectList', function ($timeout) {
    return {
      templateUrl: 'components/adminProjectList/adminProjectList.html',
      restrict: 'EA',
      link: function (scope,el, attrs)
      {
        /*scope.$watch('project', function (newMyData) {
         //Build the table and insert it into DOM
        });
        $timeout(function()
        {
        }, 0);
       */
      },
    };
  });
