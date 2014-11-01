'use strict';

angular.module('bitCrowdFundsApp')
 .controller('EditprojectCtrl', function ($scope, $routeParams, $http, $location, ProjectRes, Auth) 
 {
	$scope.message = '';
	$scope.nameProject = $routeParams.name;
	var currentUser = Auth.getCurrentUser();
	$scope.currentProject = ProjectRes.get({name: $scope.nameProject});
	
	//var $scope.asAccess = false;
	if (!(currentUser.role == 'admin') && !(currentUser.name == $scope.currentProject.name))
		$location.path( "/projects" );

	$scope.editProject = function ()
	{
		console.log($scope.currentProject);
		/*var res = ProjectRes.update($scope.nameProject, $scope.currentProject);
		if (!res)
			return $scope.message = "Fail to update";
		$scope.message = "Project updated";*/

		var obj = 
		{
			user: {
				name: currentUser.name,
				id: currentUser._id,
				role: currentUser.role
			},
			project: $scope.currentProject
		};
		$http.put('api/projects/'+$scope.nameProject, obj)
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
