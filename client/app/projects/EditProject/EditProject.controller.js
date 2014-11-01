'use strict';

angular.module('bitCrowdFundsApp')
 .controller('EditprojectCtrl', function ($scope, $routeParams, $http, ProjectRes) 
 {
	$scope.message = 'TEST';
	$scope.nameProject = $routeParams.name;
	console.log($scope.nameProject);
	$scope.currentProject = ProjectRes.get({name: $scope.nameProject});
	console.log($scope.currentProject);
	$scope.editProject = function ()
	{
		$http.put('api/projets/'+$scope.nameProject, $scope.currentProject)
		.sucess(function(data, status, headers, config)
		{
			$scope.message = "Project updated";
		})
		.error(function(data, status, headers, config)
		{
			$scope.message = "Fail to update";
		});
	}
 });
