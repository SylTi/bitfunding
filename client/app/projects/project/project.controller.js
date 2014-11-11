'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProjectCtrl', function ($scope, $http, $routeParams, ProjectRes, Auth, $location) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.currentProject =  false;
    $scope.resContrib = '';
    $scope.projectName = '';
    $scope.filteredContributors = [];


    $scope.init = function() {
        ProjectRes.get({name: $routeParams.projectName}).
            $promise.then(function(datas) {
                $scope.currentProject = datas;
                $scope.projectName = $routeParams.projectName;

                //group contributors by id
                var items = _.groupBy($scope.currentProject.contributors, function(item)
                {
                  return item.contribId;
                });
                console.log("ITEMS:", items);
                _.forEach(items, function (item, key)
                {
                  var privContrib;
                  var name;
                  var sum = _.reduce(item, function (sum, contrib)
                  {
                    console.log("SUM:\n", sum, "\n\nAMOUNT:", contrib.amount);
                    privContrib = contrib.isPrivate;
                    name = contrib.userName;
                    return sum + contrib.amount;
                  }, 0);
                  console.log("item:\n", item, "\n\nkey:\n", key);
                  $scope.filteredContributors.push({userId: key, total: sum, isPrivate: privContrib, userName: name});
                });
                console.log("FILTERED_CONTRIB:\n", $scope.filteredContributors);
            }, function(err){
                $location.path('/projects');
        });
    };

    $scope.contribute = function()
    {
      var repl = $scope.contribAmount.replace(',', '.');
      var contribSatoshi = parseFloat(repl*100000000);
      var obj = {
        userId: $scope.currentUser._id,
        userName: $scope.currentUser.name,
        amount: contribSatoshi,
        isPrivate: $scope.currentUser.privateContrib};

    	$http.post('api/projects/'+$scope.currentProject.slug+'/contrib', obj)
    	.success(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'You just contributed '+$scope.contribAmount+' BTC to ' + $scope.projectName;
    		$scope.currentProject = data;
        console.log(data);
    	}).error(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'Something wrong happend : ' + data;
    	});
    };
  });
