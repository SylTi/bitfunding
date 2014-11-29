'use strict';

angular.module('bitCrowdFundsApp')
  .directive('adminProjectList', function () {
    return {
      //templateUrl: 'components/adminProjectList/adminProjectList.html',
      restrict: 'EA',
      //replace: true,
      //transclude: true,
      //scope: true
      scope: {
        projects: '='
      },
      //replace: true,
      //transclude: true,
      /*controller: function($scope)
      {
        $scope.$watch('projects', function(v) {
           $scope.projects = v;
        });
      }*/
      link: function(scope, element, attrs)
      {
        element.text('<div>shit</div>');
        scope.$on("Data_Ready", function  ()
        {
          element.text('<div>shit</div>');
        });
      }

    };
  });
