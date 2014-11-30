'use strict';

angular.module('bitCrowdFundsApp')
  .directive('adminProjectList', function ($timeout) {
    return {
      templateUrl: 'components/adminProjectList/adminProjectList.html',
      restrict: 'EA',
      //template: '<div>this is my template</div>',
      /*scope: {
        project: '='
      },*/
      link: function (scope,el, attrs)
      {
        /*scope.$watch('project', function (newMyData) {
         //Build the table and insert it into DOM
        });
        console.log("before: " + el.html());

        $timeout(function()
        {
          console.log("After: " + el.html());
          $timeout(function()
          {
            console.log("After2: " + el.html());
          }, 0);
        }, 0);
       $timeout(function ()
       {
        console.log('HERE');
       });*/
      },
      /*template:
      [
        //'<li class="list-group-item" ng-repeat=\'project in projects\'>',
        '<strong>',
        '<span class="label label-success" ng-show="project.amountRaised >= project.amountToRaise"> Finished</span>',
        '<span> clas="label label-warning" ng-show="project.amountRaised !== 0 && project.amountRaised < project.amountToRaise"> Ongoing</span>',
        '<span> class="label label-default" ng-show="project.amountRaised === 0"> Not started</span>',
        '&nbsp;&nbsp;',
        '<span> {{project.name}} ({{project.amountRaised | toBTC}} / {{project.amountToRaise | toBTC}}</span>'

      ].join('')*/
      //template: 'test'
    };
  });
