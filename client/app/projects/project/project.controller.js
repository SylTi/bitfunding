'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProjectCtrl', function ($scope, $http, $routeParams, ProjectRes, Auth) {
    var currentUser = Auth.getCurrentUser();
    $scope.currentProject = ProjectRes.get({name: $routeParams.projectName});
    console.log($scope.currentProject);
    console.log($routeParams.projectName);
    $scope.projectName = $routeParams.projectName;

    $scope.resContrib = '';
    $scope.contribute = function()
    {
        var repl = $scope.contribAmount.replace(',', '.');
        var contribSatoshi = parseFloat(repl*100000000);
    	$http.post('api/projects/'+$scope.currentProject.slug+'/contrib', {userId: currentUser._id, userName: currentUser.name, amount: contribSatoshi})
    	.success(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'You just contributed '+$scope.contribAmount+' BTC to ' + $scope.projectName;
    		//$scope.$apply();
    		$scope.currentProject = data;
    		console.log("contrib ok ");
    	}).error(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'Something wrong happend';
    	});
    };
  });
