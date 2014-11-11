'use strict';

angular.module('bitCrowdFundsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/projects', {
        title: 'List of projects',
        templateUrl: 'app/projects/list/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/addproject', {
        title: 'Add Project',
        templateUrl: 'app/projects/addproject/addproject.html',
        controller: 'AddprojectCtrl',
        authenticate: true
      })
      .when('/projects/:projectName', {
        title: 'Project',
        templateUrl: 'app/projects/project/project.html',
        controller: 'ProjectCtrl',
      })
      .when('/projects/:name/edit', {
        title: 'Edit Project',
        templateUrl: 'app/projects/EditProject/editproject.html',
        controller: 'EditprojectCtrl',
        authenticate: true
      });
  });
