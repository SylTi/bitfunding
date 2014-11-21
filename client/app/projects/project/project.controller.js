'use strict';

angular.module('bitCrowdFundsApp')
  .controller('ProjectCtrl', function ($scope, $http, $routeParams, ProjectRes, Auth, $location, CoindeskAPI) {
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
        var sum = _.reduce(item, function (sum, contrib)
        {
          return sum + contrib.amount;
        }, 0);

        $scope.filteredContributors.push({userId: key, total: sum});
      });
      $scope.nbBackers = Object.keys($scope.filteredContributors).length;
    };

    var setPrivateInfos = function (contribArray)
    {
      _.forEach(contribArray, function(item)
        {
          $http.get('api/users/'+item.userId+'/privateContrib')
          .success(function(data)
          {
            item.isPrivate = data.isPrivate;
            item.userName = data.name;

          }).error(function(data)
          {
            console.log('ERROR', data);
          });

        });
    };

    $scope.init = function() {
        ProjectRes.get({name: $routeParams.projectName}).
            $promise.then(function(datas) {
                $scope.currentProject = datas;
                $scope.projectName = $routeParams.projectName;

                //group contributors by id
                getContributors($scope.currentProject.contributors);
                setPrivateInfos($scope.filteredContributors);

                //set days to go
                var m = moment($scope.currentProject.dateEndCampaign);
                var today = moment().startOf('day');
                $scope.daysToGo = Math.round(moment.duration(m - today).asDays());
                if ($scope.daysToGo < 0)
                {
                  $scope.daysToGo = 0;
                }
                 $scope.currentPrices = CoindeskAPI.query();
                //End days to go
            }, function(){
                $location.path('/projects');
        });
    };

    $scope.contribute = function()
    {
      var repl = $scope.contribAmount.replace(',', '.');
      var contribSatoshi = parseFloat(repl*100000000);
      var obj = {
        userId: $scope.currentUser._id,
        amount: contribSatoshi
      };

    	$http.post('api/projects/'+$scope.currentProject.slug+'/contrib', obj)
    	.success(function(data)
    	{
    		$scope.resContrib = 'You just contributed '+$scope.contribAmount+' BTC to ' + $scope.projectName;

        //reload data into scope
        $scope.currentProject = data;
        getContributors(data.contributors);
        setPrivateInfos($scope.filteredContributors);

    	}).error(function(data)
    	{
    		$scope.resContrib = 'Something wrong happend : ' + data;
    	});
    };

     $scope.changePrice = function()
    {
     $scope.currentPriceD = ($scope.contribAmount) * $scope.currentPrices.bpi.USD.rate;
    };
  });
