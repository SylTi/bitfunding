'use strict';

angular.module('bitCrowdFundsApp')
.controller('AddprojectCtrl', function ($scope, $http, Auth, Slug)
{
	$scope.message = '';
	$scope.addProject = function ()
	{
		$scope.project.Owner = Auth.getCurrentUser().name;
    if ($scope.project.name)
      $scope.project.slug = Slug.slugify($scope.project.name);
		$http.post('api/projects/', $scope.project)
		.success(function(data, status, headers, config)
		{
			$scope.message = {type:'success', text:'Your project has been added'};
		})
		.error(function(data, status, headers, config)
  	{
  		$scope.message = {type:'warning', text:('Something wrong happend : ' + data.reason)};
  	});
	}
});
