'use strict';

angular.module('bitCrowdFundsApp')
  .controller('SearchCtrl', function ($scope, $http, $routeParams) {
    $scope.message = 'Hello';


    $http.get('/api/projects/search/'+ $routeParams.name)
    .success(function (data)
    {
      $scope.projectsList = data.data;
    })
    .error(function (data)
    {
      console.log('Error :', data);
    });
  });
