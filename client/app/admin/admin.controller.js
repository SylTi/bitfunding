'use strict';

angular.module('bitCrowdFundsApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, ProjectRes, $location) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.projects = ProjectRes.query();
    $scope.message = '';

    $scope.init = function ()
    {
       $scope.users = User.query(function ()
       {
          $http.get('api/refunds/').success(function (data)
          {
            $scope.refunds = data;
            var res = _.forEach($scope.refunds, function (refund)
            {
              refund.userInfos = _.find($scope.users, function (user)
              {
                return user._id === refund.userId;
              });
            });
            console.log($scope.refunds);
            console.log(res);
          }).error(function (err)
          {
            console.log(err);
            $scope.message = 'Something wrong happend';
          });
       });

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
        $http.put('api/refunds/' + refund._id)
        .success(function()
        {
          $scope.message = 'If it isn\'t already done you should send the funds from your offline wallet !';
        }).error(function (err)
        {
          console.log(err);
          $scope.message = 'Something wrong happend';
        });
      };
  });
