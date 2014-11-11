'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProjectCtrl', function ($scope, $http, $routeParams, ProjectRes, Auth, $location) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.currentProject =  false;
    $scope.resContrib = '';
    $scope.projectName = '';


    var getContributors = function(contribArray)
    {
      $scope.filteredContributors = [];

      var items = _.groupBy(contribArray, function(item)
      {
        return item.contribId;
      });

      _.forEach(items, function (item, key)
      {
        var privContrib;
        var name;
        var sum = _.reduce(item, function (sum, contrib)
        {
          privContrib = contrib.isPrivate;
          name = contrib.userName;
          return sum + contrib.amount;
        }, 0);

        $scope.filteredContributors.push({userId: key, total: sum, isPrivate: privContrib, userName: name});
      });
      $scope.nbBackers = Object.keys($scope.filteredContributors).length
    };

    $scope.init = function() {
        ProjectRes.get({name: $routeParams.projectName}).
            $promise.then(function(datas) {
                $scope.currentProject = datas;
                $scope.projectName = $routeParams.projectName;

                //group contributors by id
                getContributors($scope.currentProject.contributors);

                //set days to go
                var m = moment($scope.currentProject.dateEndCampaign);
                var today = moment().startOf('day');
                $scope.daysToGo = Math.round(moment.duration(m - today).asDays());
                if ($scope.daysToGo < 0)
                  $scope.daysToGo = 0;
                //End days to go
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

        //reload data into scope
        $scope.currentProject = data;
        getContributors(data.contributors);

    	}).error(function(data, status, headers, config)
    	{
    		$scope.resContrib = 'Something wrong happend : ' + data;
    	});
    };
  });
