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
    	$http.post('api/projects/'+$scope.projectName+'/contrib', {userId: currentUser._id, amount: $scope.contribAmount})
    	.success(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'Vous avez contribué '+$scope.contribAmount+' BTC to ' + $scope.projectName;
    	}).error(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'Une erreur est survenue !';
    	});
    }
  });
