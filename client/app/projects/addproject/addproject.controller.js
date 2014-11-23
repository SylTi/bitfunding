'use strict';

angular.module('bitCrowdFundsApp')
.controller('AddprojectCtrl', function ($scope, $http, $location, Auth, Slug)
{
	$scope.message = '';
	$scope.addProject = function ()
	{
		$scope.project.Owner = Auth.getCurrentUser().name;
    if ($scope.project.name)
    {
      $scope.project.slug = Slug.slugify($scope.project.name);
      $scope.project.dateEndCampaign = $scope.dt;
    }
    else
    {
      console.log('error, no slug');
      return ;
    }
		$http.post('api/projects/', $scope.project)
		.success(function()
		{
			//$scope.message = {type:'success', text:'Your project has been added'};
      $location.path('/projects/'+$scope.project.slug);
		})
		.error(function(data)
  	{
  		$scope.message = {type:'warning', text:('Something wrong happend : ' + data.reason)};
  	});
	};


  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

});
