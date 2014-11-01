'use strict';

angular.module('bitCrowdFundsApp')
 .controller('EditprojectCtrl', function ($scope, $routeParams, $http, ProjectRes) 
 {
	$scope.message = '';
	$scope.nameProject = $routeParams.name;
	console.log($scope.nameProject);
	$scope.currentProject = ProjectRes.get({name: $scope.nameProject});
	console.log($scope.currentProject);
	$scope.editProject = function ()
	{
		console.log($scope.currentProject);
		/*var res = ProjectRes.update($scope.nameProject, $scope.currentProject);
		if (!res)
			return $scope.message = "Fail to update";
		$scope.message = "Project updated";*/

		$http.put('api/projects/'+$scope.nameProject, $scope.currentProject)
		.success(function(data, status, headers, config)
		{
			$scope.message = "Project updated";
		})
		.error(function(data, status, headers, config)
		{
			$scope.message = "Fail to update";
		});
	}
 });
