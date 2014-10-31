'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProjectsCtrl', function ($scope, ProjectRes) {
    $scope.message = 'Hello';
    $scope.projectsList = ProjectRes.query();
  });
