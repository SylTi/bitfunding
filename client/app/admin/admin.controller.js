'use strict';

angular.module('bitCrowdFundsApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, ProjectRes, $location) {

    // Use the User $resource to fetch all users
    $scope.message = '';
    $scope.projects = [{}];
    $scope.init = function ()
    {
       $scope.users = User.query(function ()
       {
          $http.get('api/refunds/').success(function (data)
          {
            $scope.refunds = data;
            _.forEach($scope.refunds, function (refund)
            {
              refund.userInfos = _.find($scope.users, function (user)
              {
                return user._id === refund.userId;
              });
            });
          }).error(function (err)
          {
            console.log(err);
            $scope.message = 'Something wrong happend';
          });
       });
      $scope.projects = ProjectRes.query();
    };

    $scope.isAdmin = function ()
    {
      return (Auth.isAdmin());
    };
    if (!Auth.isAdmin())
    {
      $location.path('/');
    }
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      // angular.forEach($scope.users, function(u, i) {
      //   if (u === user) {
      //     $scope.users.splice(i, 1);
      //   }
      // });
    };

    $scope.deleteProject = function (project)
    {
      $http.delete('api/projects/'+project._id)
      .success(function()
      {
        /*angular.forEach($scope.projects, function(p, i) {
          if (p === project)
          {
            $scope.projects.splice(i, 1);
          }
        });*/
        $scope.message = 'The selected project has been deactivated and funds returned to investors';
      })
      .error(function(data)
        {
          console.log(data);
          $scope.message = 'Something wrong happend: can\'t delete project';
        }
      );

      //ProjectRes.remove({id: project._id});
    };



      $scope.acceptRefund = function (refund)
      {
        $http.put('api/refunds/' + refund._id + '/accepted/')
        .success(function()
        {
          $scope.message = 'If it isn\'t already done you should send the funds from your offline wallet !';
        }).error(function (err)
        {
          console.log(err);
          $scope.message = 'Something wrong happend';
        });
      };

      $scope.refuseRefund = function (refund)
      {
        $http.put('api/refunds/' + refund._id + '/refused/')
        .success(function()
        {
          $scope.message = 'The balance has been returned to the user';
        }).error(function (err)
        {
          console.log(err);
          $scope.message = 'Something wrong happend';
        });
      };
      //console.log($scope.projects);
      /*$scope.$watch('projects', function(newVal, oldVal) {

                    console.log($scope.projects);
                }, true);*/

    /*$scope.$watch('projects', function(projs)
    {
      //$scope.$digest();
    });*/
  });
