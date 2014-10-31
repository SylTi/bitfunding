'use strict';

angular.module('bitCrowdFundsApp')
.controller('AddprojectCtrl', function ($scope, $http, Auth)
{
	$scope.message = '';
	$scope.addProject = function ()
	{
		$scope.project.Owner = Auth.getCurrentUser().name;
		$http.post('api/projects/', $scope.project)
		.success(function(data, status, headers, config)
		{
			$scope.message = 'Your project has been added'
		})
		.error(function(data, status, headers, config)
    	{
    		$scope.message = 'Something wrong happend';
    	});
	}
});
