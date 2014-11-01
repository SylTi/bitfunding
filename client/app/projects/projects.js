'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: 'app/projects/list/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/addproject', {
        templateUrl: 'app/projects/addproject/addproject.html',
        controller: 'AddprojectCtrl',
        authenticate: true
      })
      .when('/projects/:projectName', {
        templateUrl: 'app/projects/project/project.html',
        controller: 'ProjectCtrl',
        authenticate: true
      })
      .when('/projects/:name/edit', {
        templateUrl: 'app/projects/EditProject/editproject.html',
        controller: 'EditprojectCtrl'
      });
  });
