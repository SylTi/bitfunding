'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProjectCtrl', function ($scope, $http, $routeParams, ProjectRes, Auth) {
    $scope.message = 'Hello';
    $scope.projectName = $routeParams.projectName; 
    $scope.currentProject = ProjectRes.get({name: $routeParams.projectName});
    $scope.resContrib = "";
    var currentUser = Auth.getCurrentUser();
    console.log(currentUser);
    $scope.contribute = function(contribAmount)
    {
    	console.log("test");
    	$http.post('api/projects/'+$scope.projectName+'/contrib', {userId: currentUser._id, userName: currentUser.name, amount: $scope.contribAmount})
    	.success(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'You just contributed '+$scope.contribAmount+' XBT to ' + $scope.projectName;
    		//$scope.$apply();
    		$scope.currentProject = data;
    		console.log("contrib ok ");
    	}).error(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'Something wrong happend';
    	});
    }
  });
